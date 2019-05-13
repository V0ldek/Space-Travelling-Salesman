import {View} from "../../../Views/view.js";
import {TradeManager} from "../../Trade/tradeManager.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {ITradeItemInfo} from "../../Trade/tradeItemInfo.js";

export class StarshipTradeItemView extends View {
    private readonly tradeManager: TradeManager;
    private readonly itemName: string;

    public constructor(tradeManager: TradeManager,
                       itemName: string,
                       root: HTMLElement,
                       templateFactory: ITemplateFactory) {
        super("starship-trade-item", templateFactory, root);
        this.tradeManager = tradeManager;
        this.itemName = itemName;
        this.setInputAndButtonBehaviour();
    }

    public update(): void {
        this.updateInputMaxValue();
        this.updateInputValue();
        super.update();
    }

    protected getData(): IDictionary<string> {
        const tradeItemInfo = this.getTradeItemInfo();
        return {
            name: tradeItemInfo.getName(),
            "planet-amount": tradeItemInfo.getSpacedockAmount().toString(),
            "buy-price": tradeItemInfo.getBuyPrice().toString(),
            "sell-price": tradeItemInfo.getSellPrice().toString()
        };
    }

    private setInputAndButtonBehaviour(): void {
        this.setInputBehaviour();
        this.setBuyMaxButtonBehaviour();
        this.setSellAllButtonBehaviour();
    }

    private updateInputMaxValue(): void {
        const inputElement = this.getInputElement();
        inputElement.max = this.tradeManager.getMaximalPossibleStarshipAmountOfItem(this.itemName).toString();
    }

    private updateInputValue(): void {
        const inputElement = this.getInputElement();
        inputElement.value = this.getTradeItemInfo().getStarshipAmount().toString();
    }

    private getTradeItemInfo(): ITradeItemInfo {
        return this.tradeManager.getTradeItemInfoByName(this.itemName);
    }

    private setInputBehaviour() {
        const inputElement = this.getInputElement();
        inputElement.addEventListener("input", () => {
            this.tradeManager.setStarshipAmountForItem(this.itemName, parseInt(inputElement.value));
        });
    }

    private setBuyMaxButtonBehaviour() {
        const inputElement = this.getInputElement();
        const buyMaxElement = this.getBuyMaxButton();
        buyMaxElement.addEventListener("click", () => {
            this.tradeManager.setStarshipAmountForItem(this.itemName, parseInt(inputElement.max));
            this.tradeManager.commitTransactionForItem(this.itemName);
        });
    }

    private setSellAllButtonBehaviour() {
        const sellAllElement = this.getSellAllButton();
        sellAllElement.addEventListener("click", () => {
            this.tradeManager.setStarshipAmountForItem(this.itemName, 0);
            this.tradeManager.commitTransactionForItem(this.itemName);
        });
    }

    private getInputElement(): HTMLInputElement {
        return this.renderedTemplate.getElement().querySelector("input");
    }

    private getBuyMaxButton(): HTMLButtonElement {
        return this.renderedTemplate.getElement().querySelector("button.starship-trade-item-buy-max")
    }

    private getSellAllButton(): HTMLButtonElement {
        return this.renderedTemplate.getElement().querySelector("button.starship-trade-item-sell-all");
    }
}