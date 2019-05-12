import {IItemStore, IPlanet} from "../GameData/gameDataParser.js";
import {Point} from "../GameSystem/point.js";
import {Dictionary, IDictionary} from "../dictionary.js";
import {IItemStoreInfo, ItemStore} from "./itemStore.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {PlanetCardView} from "../Views/Planets/planetCardView.js";
import {PlanetModalView} from "../Views/Planets/planetModalView.js";
import {IStarshipCardInfo} from "../Starships/starship.js";

export interface IPlanetCardInfo {
    getName(): string;
    getPosition(): Point;
}

export interface IPlanetInfo extends IPlanetCardInfo {
    getItemStores(): IItemStoreInfo[]
}

export interface ISpacedock extends IPlanetCardInfo {
    dockArrivingStarship(starshipCardInfo: IStarshipCardInfo): void;
    checkOutDepartingStarship(starshipCardInfo: IStarshipCardInfo): void;
}

export class Planet implements IPlanetInfo, ISpacedock, IUpdateable {
    private readonly name: string;
    private readonly position: Point;
    private readonly itemStores: IDictionary<ItemStore> = {};
    private readonly templateFactory: ITemplateFactory;
    private readonly cardView: PlanetCardView;
    private readonly modalView: PlanetModalView;

    public constructor(name: string, data: IPlanet, templateFactory: ITemplateFactory) {
        this.name = name;
        this.templateFactory = templateFactory;
        this.position = new Point(data.x, data.y);
        this.loadItemStores(data.available_items);
        this.cardView = new PlanetCardView(this, templateFactory);
        this.modalView = new PlanetModalView(this, templateFactory);
    }

    public getName(): string {
        return this.name;
    }

    public getPosition(): Point {
        return this.position;
    }

    public getItemStores(): IItemStoreInfo[] {
        const result: IItemStoreInfo[] = [];
        Dictionary.forEach(this.itemStores, (_, i) => result.push(i));
        return result;
    }

    public update(): void {
        this.cardView.update();
        this.modalView.update();
    }

    public dockArrivingStarship(starshipCardInfo: IStarshipCardInfo): void {
        this.modalView.createStarshipView(starshipCardInfo);
    }

    public checkOutDepartingStarship(starshipCardInfo: IStarshipCardInfo): void {
        this.modalView.removeStarshipView(starshipCardInfo.getName());
    }

    private loadItemStores(data: IDictionary<IItemStore>): void {
        Dictionary.forEach(data, (k, i) => this.addItemStore(k, i));
    }

    private addItemStore(name: string, data: IItemStore) {
        this.itemStores[name] = new ItemStore(name, data.available, data.buy_price, data.sell_price);
    }
}