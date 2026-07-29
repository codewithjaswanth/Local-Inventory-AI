export interface UserCoordinates {
  latitude: number;
  longitude: number;
}

export type TravelMode = 'driving' | 'two-wheeler' | 'bicycling' | 'walking';

export interface LocationResult {
  coordinates: UserCoordinates | null;
  error: string | null;
  permissionDenied: boolean;
}

/**
 * Validates latitude (-90 to 90) and longitude (-180 to 180)
 */
export function isValidCoordinate(lat: number | null | undefined, lng: number | null | undefined): boolean {
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  if (isNaN(lat) || isNaN(lng)) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// In-memory cache for reverse geocoding results
const locationNameCache: Record<string, string> = {};

/**
 * Converts GPS latitude and longitude into a user-friendly city or village name.
 * Uses BigDataCloud & OpenStreetMap Nominatim APIs with smart local region fallback.
 */
export async function getCityOrVillageFromCoords(lat: number, lng: number): Promise<string> {
  if (!isValidCoordinate(lat, lng)) {
    return 'Guntur / Vijayawada Region';
  }

  const cacheKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
  if (locationNameCache[cacheKey]) {
    return locationNameCache[cacheKey];
  }

  try {
    // 1. Try BigDataCloud Free Reverse Geocode Client API (No API key required)
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    if (res.ok) {
      const data = await res.json();
      const cityOrVillage =
        data.locality ||
        data.city ||
        data.localityInfo?.informal?.[0]?.name ||
        data.principalSubdivision;

      if (cityOrVillage) {
        const stateOrDistrict = data.principalSubdivision ? `, ${data.principalSubdivision}` : '';
        const formatted = `${cityOrVillage}${stateOrDistrict}`;
        locationNameCache[cacheKey] = formatted;
        return formatted;
      }
    }
  } catch (err) {
    console.warn('BigDataCloud reverse geocode fallback error:', err);
  }

  try {
    // 2. Fallback to OpenStreetMap Nominatim API
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const place = addr.village || addr.suburb || addr.town || addr.city || addr.county;
      if (place) {
        const state = addr.state ? `, ${addr.state}` : '';
        const formatted = `${place}${state}`;
        locationNameCache[cacheKey] = formatted;
        return formatted;
      }
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode error:', err);
  }

  // 3. Fallback smart geographical estimation if offline/failed
  let fallbackName = 'Local Region';
  if (lat >= 16.0 && lat <= 16.7 && lng >= 80.0 && lng <= 80.8) {
    fallbackName = 'Guntur / Tenali Region';
  } else if (lat >= 16.4 && lat <= 16.8 && lng >= 80.5 && lng <= 81.0) {
    fallbackName = 'Vijayawada Region';
  } else if (lat >= 17.2 && lat <= 17.6 && lng >= 78.2 && lng <= 78.6) {
    fallbackName = 'Hyderabad Region';
  }

  locationNameCache[cacheKey] = fallbackName;
  return fallbackName;
}

/**
 * Retrieves the user's current GPS coordinates using the browser Geolocation API.
 */
export function getUserLocation(timeoutMs: number = 8000): Promise<LocationResult> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      resolve({
        coordinates: null,
        error: 'Geolocation is not supported by your browser.',
        permissionDenied: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
          permissionDenied: false,
        });
      },
      (err) => {
        let errorMsg = 'Unable to retrieve your current location.';
        let denied = false;

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMsg = 'Location permission was denied by your browser.';
            denied = true;
            break;
          case err.POSITION_UNAVAILABLE:
            errorMsg = 'GPS location information is unavailable.';
            break;
          case err.TIMEOUT:
            errorMsg = 'Request to get location timed out.';
            break;
        }

        resolve({
          coordinates: null,
          error: errorMsg,
          permissionDenied: denied,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: timeoutMs,
        maximumAge: 30000,
      }
    );
  });
}

/**
 * Calculates straight-line distance in kilometers between two lat/lng coordinates using the Haversine formula.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

/**
 * Estimates travel duration string given distance in km and travel mode.
 */
export function calculateTravelTime(distanceKm: number, mode: TravelMode): string {
  if (distanceKm <= 0) return '1 min';

  let speedKmH = 30; // Driving default ~30 km/h in city
  switch (mode) {
    case 'driving':
      speedKmH = 30;
      break;
    case 'two-wheeler':
      speedKmH = 25;
      break;
    case 'bicycling':
      speedKmH = 15;
      break;
    case 'walking':
      speedKmH = 5;
      break;
  }

  const hours = distanceKm / speedKmH;
  const minutes = Math.max(1, Math.round(hours * 60));

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
}

/**
 * Returns effective shop coordinates anchored within 1-4 km of user's acquired location.
 */
export function getEffectiveShopCoordinates(
  userLocation: UserCoordinates | null,
  shopLat?: number | null,
  shopLng?: number | null,
  fallbackDistanceKm: number = 1.2
): UserCoordinates | null {
  if (!userLocation) {
    if (isValidCoordinate(shopLat, shopLng)) {
      return { latitude: shopLat!, longitude: shopLng! };
    }
    return null;
  }

  // If shop coordinates exist and are within a local 50 km radius of user location, use them directly
  if (isValidCoordinate(shopLat, shopLng)) {
    const directDist = calculateHaversineDistance(
      userLocation.latitude,
      userLocation.longitude,
      shopLat!,
      shopLng!
    );
    if (directDist <= 50) {
      return { latitude: shopLat!, longitude: shopLng! };
    }
  }

  // Anchor shop coordinates nearby (1-4 km) relative to user's acquired location
  const targetKm = Math.min(Math.max(fallbackDistanceKm, 0.5), 4.0);
  const latOffset = (targetKm / 111) * 0.707;
  const cosLat = Math.cos((userLocation.latitude * Math.PI) / 180);
  const lngOffset = (targetKm / (111 * (cosLat || 1))) * 0.707;

  return {
    latitude: parseFloat((userLocation.latitude + latOffset).toFixed(5)),
    longitude: parseFloat((userLocation.longitude + lngOffset).toFixed(5)),
  };
}

/**
 * Generates a valid Google Maps directions URL.
 * URL format:
 * https://www.google.com/maps/dir/?api=1&origin=<lat>,<lng>&destination=<lat>,<lng>&travelmode=<mode>
 */
export function generateGoogleMapsUrl(options: {
  origin?: UserCoordinates | null;
  destinationLat?: number | null;
  destinationLng?: number | null;
  destinationAddress?: string;
  travelMode?: TravelMode;
}): string {
  const { origin, destinationLat, destinationLng, destinationAddress, travelMode = 'driving' } = options;

  let gMode = travelMode;
  if (travelMode === 'two-wheeler') {
    gMode = 'two-wheeler' as any;
  }

  const params = new URLSearchParams();
  params.append('api', '1');

  // Add origin if valid user coordinates exist
  if (origin && isValidCoordinate(origin.latitude, origin.longitude)) {
    params.append('origin', `${origin.latitude},${origin.longitude}`);
  }

  // Add destination
  if (isValidCoordinate(destinationLat, destinationLng)) {
    params.append('destination', `${destinationLat},${destinationLng}`);
  } else if (destinationAddress) {
    params.append('destination', destinationAddress);
  } else {
    params.append('destination', 'Local Shop');
  }

  params.append('travelmode', gMode);

  return `https://www.google.com/maps/dir/?api=1&${params.toString()}`;
}
