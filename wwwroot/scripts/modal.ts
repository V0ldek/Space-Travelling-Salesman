export class Modal {
    public static setupModalCloseBehaviour(): void {
        this.setupOnClickClose();
        this.setupOnEscapeKeyClose();
    }

    private static setupOnClickClose() {
        window.addEventListener("click", e => {
            const target = e.target as HTMLLIElement;
            if (target && target.classList.contains("modal")) {
                target.setAttribute("hidden", "");
            }
        });
    }

    private static setupOnEscapeKeyClose() {
        window.addEventListener("keydown", e => {
            if (e.key !== "Escape") {
                return;
            }
            document.querySelectorAll(".modal").forEach(modal => {
                modal.setAttribute("hidden", "");
            });
        });
    }
}