import {Game} from "./GameSystem/game.js";

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();

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
});