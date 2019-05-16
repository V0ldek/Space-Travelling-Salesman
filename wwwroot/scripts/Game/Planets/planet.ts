import {IPlanet} from "../GameData/planet.js";
import {Point} from "../GameSystem/point.js";
import {Dictionary, IDictionary} from "../../dictionary.js";
import {ItemStore} from "./ItemStore/itemStore.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {PlanetCardView} from "../Views/Planets/planetCardView.js";
import {PlanetModalView} from "../Views/Planets/planetModalView.js";
import {IItemStoreInfo} from "./ItemStore/itemStoreInfo.js";
import {IPlanetInfo} from "./planetInfo.js";
import {IStardock} from "./stardock.js";
import {IItemStore} from "../GameData/itemStore.js";
import {Starship} from "../Starships/starship.js";

export class Planet implements IPlanetInfo, IStardock, IUpdateable {
    private readonly id: number;
    private readonly name: string;
    private readonly position: Point;
    private readonly itemStores: IDictionary<ItemStore> = {};
    private readonly templateFactory: ITemplateFactory;
    private readonly cardView: PlanetCardView;
    private readonly modalView: PlanetModalView;
    private readonly dockingStarships: IDictionary<Starship> = {};

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

    public dockArrivingStarship(starship: Starship): void {
        this.modalView.createStarshipView(starship);
        this.dockingStarships[starship.getName()] = starship;
    }

    public checkOutDepartingStarship(starshipName: string): void {
        this.modalView.removeStarshipView(starshipName);
        this.dockingStarships[starshipName] = null;
    }

    public setAmountOfItem(item: string, amount: number): void {
        this.itemStores[item].setAmount(amount);
    }

    public forEachDockingShip(action: (s: Starship) => void): void {
        Dictionary.forEach(this.dockingStarships, (_, s) => action(s));
    }

    private loadItemStores(data: IDictionary<IItemStore>): void {
        Dictionary.forEach(data, (k, i) => this.addItemStore(k, i));
    }

    private addItemStore(name: string, data: IItemStore) {
        this.itemStores[name] = new ItemStore(name, data.available, data.buy_price, data.sell_price);
    }
}