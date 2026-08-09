import { w as writable } from "./index3.js";
const isSearchModalOpen = writable(false);
const isLocationModalOpen = writable(false);
const activeShopModal = writable(null);
const userLocation = writable("MG Road, Indiranagar, Bengaluru");
export {
  isLocationModalOpen as a,
  activeShopModal as b,
  isSearchModalOpen as i,
  userLocation as u
};
