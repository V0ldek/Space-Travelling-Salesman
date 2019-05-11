import {IItemStore, IPlanet} from "../GameData/gameDataParser.js";
import {IPositionInfo, Position} from "../GameSystem/position.js";
import {IDictionary} from "../dictionary.js";
import {ItemStore} from "./itemStore.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {PlanetCardView} from "../Views/planetCardView.js";

export interface IPlanetCardInfo {
    getName(): string;
    getPosition(): IPositionInfo;
}

export class Planet implements IPlanetCardInfo, IUpdateable {
    private readonly name: string;
    private readonly position: Position;
    private readonly itemStores: IDictionary<ItemStore> = {};
    private readonly templateFactory: ITemplateFactory;
    private readonly cardView: PlanetCardView;

    public constructor(name: string, data: IPlanet, templateFactory: ITemplateFactory) {
        this.name = name;
        this.templateFactory = templateFactory;
        this.position = new Position(data.x, data.y);
        this.loadItemStores(data.available_items);
        this.cardView = new PlanetCardView(this, templateFactory);
    }

    public getName(): string {
        return this.name;
    }

    public getPosition(): IPositionInfo {
        return this.position;
    }

    public update(): void {
        this.cardView.update();
    }

    private loadItemStores(data: IDictionary<IItemStore>): void {
        for(const key in data) {
            if(data.hasOwnProperty(key)) {
                this.addItemStore(key, data[key]);
            }
        }
    }

    private addItemStore(name: string, data: IItemStore) {
        this.itemStores[name] = new ItemStore(name, data.available, data.buy_price, data.sell_price);
    }
}