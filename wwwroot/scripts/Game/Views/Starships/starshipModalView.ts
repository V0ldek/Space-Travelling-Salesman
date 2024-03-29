import {Starship} from "../../Starships/starship.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {Format} from "../../../format.js";
import {StarshipMovementForm} from "./starshipMovementForm.js";
import {StarshipCargoView} from "./starshipCargoView.js";
import {StarshipTradeView} from "./starshipTradeView.js";
import {IStardockRepository} from "../../Planets/stardockRepository.js";
import {GameClock} from "../../GameSystem/Clock/gameClock.js";
import {ModalView} from "../../../Views/modalView.js";

export class StarshipModalView extends ModalView {
    private readonly starship: Starship;
    private readonly stardockRepository: IStardockRepository;
    private readonly starshipMovementForm: StarshipMovementForm;
    private readonly starshipCargoView: StarshipCargoView;
    private starshipTradeView: StarshipTradeView = null;
    private isInDockedMode: boolean = true;

    public constructor(starship: Starship,
                       stardockRepository: IStardockRepository,
                       templateFactory: ITemplateFactory) {
        super("starship-modal", `starship-modal-${starship.getId()}`, templateFactory);
        this.starship = starship;
        this.stardockRepository = stardockRepository;
        this.starshipMovementForm = new StarshipMovementForm(this.starship, this.getMovementFormElement());
        this.starshipCargoView = new StarshipCargoView(
            this.starship.getCargoHold(),
            this.renderedTemplate.getElement(),
            this.templateFactory);
        this.toggleTradeView();
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
        const eta = this.starship.getEtaToCurrentDestination();
        const etaString = eta > 0 ? ` in ${GameClock.ticksToTimeString(eta)}` : "";
        return {
            name: this.starship.getName(),
            planet: this.starship.getDestinationName(),
            eta: etaString,
            position: Format.positionToString(this.starship.getPosition())
        }
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
        return this.starship.getEtaToCurrentDestination() > 0;
    }

    private toggleTradeView() {
        this.starshipCargoView.toggle();
        if (this.starshipTradeView) {
            this.starshipTradeView.remove();
            this.starshipTradeView = null;
        } else {
            this.starshipTradeView = new StarshipTradeView(
                this.starship,
                this.stardockRepository,
                this.renderedTemplate.getElement(),
                this.templateFactory);
        }
    }
}