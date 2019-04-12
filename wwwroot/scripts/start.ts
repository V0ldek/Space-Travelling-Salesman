document.querySelectorAll<HTMLButtonElement>("#start-button, #nickname-modal-close-button")
    .forEach(button => {
        button.addEventListener("click", () => {
            const modal = document.querySelector("#nickname-modal");
            modal.toggleAttribute("hidden");
        });
    });