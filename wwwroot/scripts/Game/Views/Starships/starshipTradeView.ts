import {Starship} from "../../Starships/starship.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {TradeManager} from "../../Trade/tradeManager.js";
import {IStardockRepository} from "../../Planets/stardockRepository.js";
import {StarshipTradeItemView} from "./starshipTradeItemView.js";
import {View} from "../../../Views/view.js";

export class StarshipTradeView extends View {
    private readonly tradeManager: TradeManager;
    private readonly tradeItemViews: StarshipTradeItemView[] = [];

    public constructor(starship: Starship,
                       stardockRepository: IStardockRepository,
                       root: HTMLElement,
                       templateFactory: ITemplateFactory) {
        super("starship-trade", templateFactory, root);
        this.tradeManager = stardockRepository.createTradeManagerBetweenStardockAndStarship(
            starship.getDestinationName(),
            starship);

        this.createTradeItemViews();
        this.setButtonBehaviour();
        this.tradeManager.subscribeToChanges(() => this.update());
        this.update();
    }

    public update(): void {
        this.tradeItemViews.forEach(v => v.update());
        this.updateBalanceColour();
        this.updateCargoSizeColour();
        super.update();
    }

    protected getData(): IDictionary<string> {
        return {
            cargo: this.tradeManager.getStarshipCargoSizeAfterTransaction().toString(),
            capacity: this.tradeManager.getStarshipCapacity().toString(),
            credits: this.tradeManager.getCreditsAfterTransaction().toString(),
            balance: this.getFormattedBalanceString()
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
        this.setSubmitBehaviour();
        this.setSellAllBehaviour();
        this.setResetBehaviour();
    }

    private setSubmitBehaviour(): void {
        this.setButtonEventListener(
            ".starship-trade-submit",
            () => this.tradeManager.commitTransaction());
    }

    private setSellAllBehaviour(): void {
        this.setButtonEventListener(
            ".starship-trade-sell-all",
            () => {
                this.tradeManager.setStarshipAmountForAllToZero();
                this.tradeManager.commitTransaction();
            }
        )
    }

    private setResetBehaviour(): void {
        this.setButtonEventListener(
            ".starship-trade-reset",
            () => this.tradeManager.reset());
    }

    private setButtonEventListener(buttonSelector: string, listener: (() => void)) {
        const button = this.renderedTemplate.getElement().querySelector(`button${buttonSelector}`);
        button.addEventListener("click", listener);
    }

    private updateBalanceColour(): void {
        const balanceElement = this.renderedTemplate.getElement().querySelector(".data-balance");
        balanceElement.classList.remove("text-green", "text-red");
        if (this.tradeManager.getTransactionValue() < 0) {
            balanceElement.classList.add("text-red");
        } else if (this.tradeManager.getTransactionValue() > 0) {
            balanceElement.classList.add("text-green");
        }
    }

    private updateCargoSizeColour(): void {
        const balanceElement = this.renderedTemplate.getElement().querySelector(".starship-cargo-capacity");
        balanceElement.classList.remove("text-yellow");
        if (this.tradeManager.getStarshipCargoSizeAfterTransaction() == this.tradeManager.getStarshipCapacity()) {
            balanceElement.classList.add("text-yellow");
        }
    }

    private getFormattedBalanceString(): string {
        const balance = this.tradeManager.getTransactionValue();
        return balance > 0 ? `+${balance}` : balance.toString();
    }
}