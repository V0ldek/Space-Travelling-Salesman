import {Modal} from "../modal.js";
import {StartScreen} from "./startScreen.js";

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = new StartScreen();
    Modal.setupModalCloseBehaviour();

});