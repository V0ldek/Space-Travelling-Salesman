import {View} from "../view.js";
import {IItemStoreInfo} from "../../Planets/itemStore.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../dictionary.js";

export class PlanetItemStoreView extends View{
    private readonly itemStoreInfo: IItemStoreInfo;

    public constructor(
        itemStoreInfo: IItemStoreInfo,
        templateFactory: ITemplateFactory,
        root: HTMLElement = null) {
        super("planet-item-store", templateFactory, root);
        this.itemStoreInfo = itemStoreInfo;
        this.update();
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.itemStoreInfo.getName(),
            amount: this.itemStoreInfo.getAmount().toString(),
            "buy-price": this.itemStoreInfo.getBuyPrice().toString(),
            "sell-price": this.itemStoreInfo.getSellPrice().toString()
        };
    }
}