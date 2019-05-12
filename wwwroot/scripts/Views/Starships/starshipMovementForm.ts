import {Starship} from "../../Starships/starship.js";

export class StarshipMovementForm {
    private readonly starship: Starship;
    private readonly form: HTMLFormElement;

    public constructor(starship: Starship, formElement: HTMLFormElement) {
        this.starship = starship;
        this.form = formElement;
        this.setMovementFormData();
    }

    public toggle(): void {
        this.form.toggleAttribute("hidden");
        if (!this.form.hidden) {
            this.getButtonElement().disabled = false;
        }
    }

    private setMovementFormData(): void {
        this.createSelectOptions();
        this.setButtonBehaviour();
    }

    private createSelectOptions(): void {
        const select = this.getSelectElement();
        for (const destination of this.starship.getPossibleDestinations()) {
            const option = document.createElement("option");
            option.text = destination;
            option.value = destination;
            select.options.add(option);
        }
    }

    private setButtonBehaviour(): void {
        const button = this.getButtonElement();
        button.addEventListener("click", () => {
            button.disabled = true;
            this.moveStarshipToSelectedDestination();
        });
    }

    private moveStarshipToSelectedDestination(): void {
        const destination = this.getSelectedDestination();
        this.starship.moveToDestination(destination);
    }

    private getSelectedDestination(): string {
        const select = this.getSelectElement();
        return select.options[select.selectedIndex].value;
    }

    private getSelectElement(): HTMLSelectElement {
        return this.form.querySelector("select");
    }

    private getButtonElement(): HTMLButtonElement {
        return this.form.querySelector("button");
    }
}