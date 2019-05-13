import {IPlanet} from "../GameData/planet.js";
import {Point} from "../GameSystem/point.js";
import {Dictionary, IDictionary} from "../dictionary.js";
import {ItemStore} from "./ItemStore/itemStore.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {PlanetCardView} from "../Views/Planets/planetCardView.js";
import {PlanetModalView} from "../Views/Planets/planetModalView.js";
import {IStarshipCardInfo} from "../Starships/starshipCardInfo.js";
import {IItemStoreInfo} from "./ItemStore/itemStoreInfo.js";
import {IPlanetInfo} from "./planetInfo.js";
import {ISpacedock} from "./spacedock.js";
import {IItemStore} from "../GameData/itemStore.js";

export class Planet implements IPlanetInfo, ISpacedock, IUpdateable {
    private readonly id: number;
    private readonly name: string;
    private readonly position: Point;
    private readonly itemStores: IDictionary<ItemStore> = {};
    private readonly templateFactory: ITemplateFactory;
    private readonly cardView: PlanetCardView;
    private readonly modalView: PlanetModalView;

    public constructor(id: number, name: string, data: IPlanet, templateFactory: ITemplateFactory) {
        this.id = id;
        this.name = name;
        this.templateFactory = templateFactory;
        this.position = new Point(data.x, data.y);
        this.loadItemStores(data.available_items);
        this.cardView = new PlanetCardView(this, templateFactory);
        this.modalView = new PlanetModalView(this, templateFactory);
    }

    public getId(): number {
        return this.id;
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

    public setAmountOfItem(item: string, amount: number): void {
        this.itemStores[item].setAmount(amount);
    }

    private loadItemStores(data: IDictionary<IItemStore>): void {
        Dictionary.forEach(data, (k, i) => this.addItemStore(k, i));
    }

    private addItemStore(name: string, data: IItemStore) {
        this.itemStores[name] = new ItemStore(name, data.available, data.buy_price, data.sell_price);
    }
}