import {Starship} from "../../Starships/starship.js";
import {GameClock} from "../../GameSystem/Clock/gameClock.js";

export class StarshipMovementForm {
    private readonly starship: Starship;
    private readonly form: HTMLFormElement;

    public constructor(starship: Starship, formElement: HTMLFormElement) {
        this.starship = starship;
        this.form = formElement;
        this.setMovementFormData();
    }

    public toggle(): void {
        // toggleAttribute does not work on the lab version of Firefox.
        if (this.form.getAttribute("hidden") !== null) {
            this.form.removeAttribute("hidden");
        } else {
            this.form.setAttribute("hidden", "");
        }
        if (!this.form.hidden) {
            this.getButtonElement().disabled = false;
            this.removeAllOptions();
            this.createSelectOptions();
        }
    }

    private setMovementFormData(): void {
        this.createSelectOptions();
        this.setButtonBehaviour();
    }

    private createSelectOptions(): void {
        const select = this.getSelectElement();
        for (const destination of this.starship.getPossibleDestinations()) {
            select.options.add(this.createOptionForDestination(destination));
        }
    }

    private createOptionForDestination(destination: string): HTMLOptionElement {
        const option = document.createElement("option");
        option.text = this.createOptionText(destination);
        option.value = destination;
        return option;
    }

    private createOptionText(destination: string): string {
        const eta = this.starship.getEtaTo(destination);
        return `${destination} in ${GameClock.ticksToTimeString(eta)}`;
    }

    private removeAllOptions() {
        const select = this.getSelectElement();
        for(let i = select.length - 1; i >= 0; --i) {
            select.options[i].remove();
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