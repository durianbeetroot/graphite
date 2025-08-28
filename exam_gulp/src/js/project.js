/* Project specific Javascript goes here. */

import ToggleBentoMenu from "./components/toggle-home-bento";


function bentoToggleInit() {
  document.querySelectorAll("[data-bento-click=\"toggle\"]").forEach((element) => {
    new ToggleBentoMenu(element);
  });
}



document.addEventListener("DOMContentLoaded", function () {
  bentoToggleInit();
});
