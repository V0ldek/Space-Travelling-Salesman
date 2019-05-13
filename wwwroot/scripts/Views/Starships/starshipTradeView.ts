import {RemovableView} from "../removableView.js";
import {Starship} from "../../Starships/starship.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {TradeManager} from "../../Trade/tradeManager.js";
import {ISpacedockRepository} from "../../Planets/spacedockRepository.js";
import {StarshipTradeItemView} from "./starshipTradeItemView.js";

export class StarshipTradeView extends RemovableView {
    private readonly tradeManager: TradeManager;
    private readonly tradeItemViews: StarshipTradeItemView[] = [];

    public constructor(starship: Starship,
                       spacedockRepository: ISpacedockRepository,
                       root: HTMLElement,
                       templateFactory: ITemplateFactory) {
        super("starship-trade", templateFactory, root);
        this.tradeManager = spacedockRepository.createTradeManagerBetweenSpacedockAndStarship(
            starship.getDestinationName(),
            starship);

        this.createTradeItemViews();
        this.setButtonBehaviour();
        this.tradeManager.subscribeToChanges(this);
        this.update();
    }

    public update(): void {
        this.tradeItemViews.forEach(v => v.update());
        super.update();
    }

    protected getData(): IDictionary<string> {
        return {
            cargo: this.tradeManager.getStarshipCargoSizeAfterTransaction().toString(),
            capacity: this.tradeManager.getStarshipCapacity().toString(),
            credits: this.tradeManager.getCreditsAfterTransaction().toString(),
            balance: this.tradeManager.getTransactionValue().toString()
        }
    }

    private createTradeItemViews(): void {
        this.tradeManager.getPossibleItemNames().forEach(i => this.createTradeItemView(i));
    }

    private createTradeItemView(item: string) {
        this.tradeItemViews.push(new StarshipTradeItemView(
            this.tradeManager,
            item,
            this.renderedTemplate.getElement(),
            this.templateFactory));
    }

    private setButtonBehaviour(): void {
        const button = this.renderedTemplate.getElement().querySelector("button");
        button.addEventListener("click", () => {
           this.tradeManager.commitTransaction();
        });
    }
}