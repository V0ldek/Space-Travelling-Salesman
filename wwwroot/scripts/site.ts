import { Game } from "./GameSystem/game.js";
import {Format} from "./format.js";

export const game = new Game();

document.querySelectorAll(".modal-trigger").forEach(modalTrigger => {
    const targetId = modalTrigger.getAttribute("data-target");
    const query = Format.sanitizeSelectorQuery(targetId);
    const target = document.querySelector(`#${query}`);
    console.warn(query);
    modalTrigger.addEventListener("click", () => {
        target.removeAttribute("hidden");
    });
});

window.addEventListener("click", e => {
    const target = e.target as HTMLLIElement;

    if (target && target.classList.contains("modal")) {
        target.setAttribute("hidden", "");
    }
});

window.addEventListener("keydown", e => {
    if (e.key !== "Escape") {
        return;
    }

    document.querySelectorAll(".modal").forEach(modal => {
        modal.setAttribute("hidden", "");
    });
});