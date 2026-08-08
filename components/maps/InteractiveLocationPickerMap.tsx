'use client';

import React, { useEffect, useRef, useState } from 'react';

interface InteractiveLocationPickerMapProps {
  lat: number;
  lng: number;
  onMarkerMove: (lat: number, lng: number) => void;
  locationName?: string;
}

declare global {
  interface Window {
    L: any;
  }
}

export const InteractiveLocationPickerMap: React.FC<InteractiveLocationPickerMapProps> = ({
  lat,
  lng,
  onMarkerMove,
  locationName = 'Selected Location',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);

  // Load Leaflet CSS & JS asynchronously if not already present
  useEffect(() => {
    if (window.L) {
      setIsLeafletLoaded(true);
      return;
    }

    // Add Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Add Leaflet JS
    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setIsLeafletLoaded(true);
      document.head.appendChild(script);
    } else {
      const checkTimer = setInterval(() => {
        if (window.L) {
          setIsLeafletLoaded(true);
          clearInterval(checkTimer);
        }
      }, 100);
      return () => clearInterval(checkTimer);
    }
  }, []);

  // Initialize map when Leaflet is ready
  useEffect(() => {
    if (!isLeafletLoaded || !mapContainerRef.current) return;

    const L = window.L;

    if (!mapInstanceRef.current) {
      // Create map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 14,
        zoomControl: true,
      });

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Custom emerald pin icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="position: relative; display: flex; items-center: center; justify-content: center;">
            <div style="width: 28px; height: 28px; background: #10b981; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 4px 14px rgba(16,185,129,0.6); display: flex; align-items: center; justify-content: center; color: #040810; font-weight: 900; font-size: 14px;">
              📍
            </div>
            <div style="position: absolute; bottom: -8px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #10b981;"></div>
          </div>
        `,
        iconSize: [28, 36],
        iconAnchor: [14, 36],
      });

      // Create draggable marker
      const marker = L.marker([lat, lng], {
        draggable: true,
        icon: customIcon,
      }).addTo(map);

      marker.bindPopup(`<b>${locationName}</b><br/>Drag pin or click map to change`).openPopup();

      // Listen to marker dragend
      marker.on('dragend', () => {
        const position = marker.getLatLng();
        onMarkerMove(position.lat, position.lng);
      });

      // Listen to map click to place pin anywhere
      map.on('click', (e: any) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        marker.setLatLng([clickLat, clickLng]);
        onMarkerMove(clickLat, clickLng);
      });

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;
    }
  }, [isLeafletLoaded]);

  // Update map view and marker when lat/lng props change externally
  useEffect(() => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      mapInstanceRef.current.setView([lat, lng], mapInstanceRef.current.getZoom() || 14);
      markerInstanceRef.current.setLatLng([lat, lng]);
      markerInstanceRef.current.getPopup()?.setContent(`<b>${locationName}</b><br/>Drag pin or click map to change`);
    }
  }, [lat, lng, locationName]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-900">
      {!isLeafletLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-xs text-white text-xs font-mono">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2" />
          <span>Loading Interactive Map Engine...</span>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Overlay Helper Badge */}
      <div className="absolute bottom-2 left-2 z-[400] bg-slate-900/90 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-400 shadow-md pointer-events-none flex items-center space-x-1.5">
        <span>📍 Click or drag pin anywhere on map to pinpoint precise village/city</span>
      </div>
    </div>
  );
};
