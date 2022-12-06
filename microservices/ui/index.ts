// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.

import { initControllers } from "./scripts/controllers";
import { initGMaps } from "./scripts/initMap";

function initMap(): void {
  const map = initGMaps();
  initControllers(map);
}




declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {  };

