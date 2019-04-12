document.querySelectorAll(".modal-trigger").forEach(modalTrigger => {
    const targetId = modalTrigger.getAttribute("data-target");
    const target = document.querySelector(targetId);
    modalTrigger.addEventListener("click", () => {
        target.removeAttribute("hidden");
    });
});

window.addEventListener("click", e => {
    const target = e.target as HTMLLIElement;

    if(target && target.classList.contains("modal")) {
        target.setAttribute("hidden", "");
    }
});

window.addEventListener("keydown", e => {
    if(e.key !== "Escape") {
        return;
    }

    document.querySelectorAll(".modal").forEach(modal => {
        modal.setAttribute("hidden", "");
    });
});