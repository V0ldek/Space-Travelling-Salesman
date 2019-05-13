import {Game} from "./GameSystem/game.js";
import {Modal} from "../modal.js";

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    Modal.setupModalCloseBehaviour();
});