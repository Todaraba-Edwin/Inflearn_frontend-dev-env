import MainController from "./controllers/MainController.js";
import * as math from './math.js'

console.log(math.sum(1,2));

document.addEventListener("DOMContentLoaded", () => {
  new MainController();
});
