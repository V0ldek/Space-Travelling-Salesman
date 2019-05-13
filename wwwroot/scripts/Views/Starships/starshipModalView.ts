import {View} from "../view.js";
import {Starship} from "../../Starships/starship.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {Format} from "../../format.js";
import {StarshipMovementForm} from "./starshipMovementForm.js";
import {StarshipCargoView} from "./starshipCargoView.js";
import {StarshipTradeView} from "./starshipTradeView.js";
import {ISpacedockRepository} from "../../Planets/spacedockRepository.js";

export class StarshipModalView extends View {
    private readonly starship: Starship;
    private readonly spacedockRepository: ISpacedockRepository;
    private readonly starshipMovementForm: StarshipMovementForm;
    private readonly starshipCargoView: StarshipCargoView;
    private starshipTradeView: StarshipTradeView = null;
    private isInDockedMode: boolean = true;

    public constructor(starship: Starship,
                       spacedockRepository: ISpacedockRepository,
                       templateFactory: ITemplateFactory) {
        super("starship-modal", templateFactory);
        this.starship = starship;
        this.spacedockRepository = spacedockRepository;
        this.starshipMovementForm = new StarshipMovementForm(this.starship, this.getMovementFormElement());
        this.starshipCargoView = new StarshipCargoView(
            this.starship.getCargoHold(),
            this.renderedTemplate.getElement(),
            this.templateFactory);
        this.toggleTradeView();
        this.setModalData();
        this.update();
    }

    public update(): void {
        if (this.shouldChangeMode()) {
            this.changeMode();
        }
        super.update();
        if (this.isInDockedMode) {
            this.starshipTradeView.update();
        } else {
            this.starshipCargoView.update();
        }
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
        console.log(`Changing mode from ${this.isInDockedMode}.`);

        this.isInDockedMode = !this.isInDockedMode;
        this.starshipMovementForm.toggle();
        this.toggleTradeView();
    }

    private isStarshipMoving() {
        return this.starship.getEta() !== "";
    }

    private toggleTradeView() {
        this.starshipCargoView.toggle();
        if (this.starshipTradeView) {
            this.starshipTradeView.remove();
            this.starshipTradeView = null;
        } else {
            this.starshipTradeView = new StarshipTradeView(
                this.starship,
                this.spacedockRepository,
                this.renderedTemplate.getElement(),
                this.templateFactory);
        }
    }
}