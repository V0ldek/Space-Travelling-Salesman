import {RemovableView} from "../removableView.js";
import {Starship} from "../../Starships/starship.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";
import {TradeManager} from "../../Trade/tradeManager.js";

export class StarshipTradeView extends RemovableView {
    private readonly tradeManager: TradeManager;

    public constructor(starship: Starship, root: HTMLElement, templateFactory: ITemplateFactory) {
        super("starship-trade", templateFactory, root);
        this.tradeManager = new TradeManager(starship);
    }

    protected getData(): IDictionary<string> {
        return {}
    }
}