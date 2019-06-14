import {Game} from "./GameSystem/game.js";
import {Modal} from "../modal.js";

document.addEventListener("DOMContentLoaded", () => {
    const href = window.location.href;
    const mapId = parseInt(href.substring(href.indexOf("?") + 1));
    const game = new Game(mapId);
    Modal.setupModalCloseBehaviour();
});