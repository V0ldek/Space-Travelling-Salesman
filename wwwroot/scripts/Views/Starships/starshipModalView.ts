import {View} from "../view.js";
import {Starship} from "../../Starships/starship.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {Format} from "../../format.js";
import {StarshipMovementForm} from "./starshipMovementForm.js";

export class StarshipModalView extends View {
    private readonly starship: Starship;
    private readonly starshipMovementForm: StarshipMovementForm;
    private isInDockedMode: boolean = false;

    public constructor(starship: Starship, templateFactory: ITemplateFactory) {
        super("starship-modal", templateFactory);
        this.starship = starship;
        this.starshipMovementForm = new StarshipMovementForm(this.starship, this.getMovementFormElement());
        this.setModalData();
        this.update();
    }

    public update(): void {
        if(this.shouldChangeMode()) {
            this.changeMode();
        }
        super.update();
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.starship.getName(),
            planet: this.starship.getDestinationName(),
            eta: this.starship.getEta(),
            position: Format.positionToString(this.starship.getPosition())
        }
    }

    private setModalData(): void {
        this.renderedTemplate.getElement().id = `starship-modal-${this.starship.getId()}`;
    }

    private getMovementFormElement(): HTMLFormElement {
        return this.renderedTemplate.getElement().querySelector("form.starship-movement");
    }

    private shouldChangeMode() {
        return this.isInDockedMode !== (!this.isStarshipMoving());
    }

    private changeMode() {
        this.isInDockedMode = !this.isInDockedMode;
        this.starshipMovementForm.toggle();
        this.toggleTradeView();
    }

    private isStarshipMoving() {
        return this.starship.getEta() === "";
    }

    private toggleTradeView() {

    }
}