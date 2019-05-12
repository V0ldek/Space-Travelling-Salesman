import {IStarship} from "../GameData/gameDataParser.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {Point} from "../GameSystem/point.js";
import {ISpacedock} from "../Planets/planet.js";
import {CargoHold, ICargoHoldInfo} from "./cargoHold.js";
import {StarshipCardView} from "../Views/Starships/starshipCardView.js";
import {ISpacedockRepository} from "../Planets/planetManager.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {GameClock} from "../GameSystem/gameClock.js";
import {StarshipModalView} from "../Views/Starships/starshipModalView.js";

export interface IStarshipCardInfo {
    getId(): number;
    getName(): string;
    getDestinationName(): string;
    getEta(): string;
    getPosition(): Point;
}

export interface IStarshipInfo extends IStarshipCardInfo {
    getCargoHold(): ICargoHoldInfo;
    getPossibleDestinations(): string[];
}

export class Starship implements IStarshipInfo, IUpdateable {
    private static readonly distancePerTick: number = 1.0;

    private readonly id: number;
    private readonly name: string;
    private readonly cargoHold: CargoHold;
    private readonly spacedockRepository: ISpacedockRepository;
    private readonly cardView: StarshipCardView;
    private readonly modalView: StarshipModalView;
    private destinationSpacedock: ISpacedock;
    private position: Point;

    public constructor(
        id: number,
        name: string,
        data: IStarship,
        spacedockRepository: ISpacedockRepository,
        templateFactory: ITemplateFactory) {
        this.id = id;
        this.name = name;
        this.cargoHold = new CargoHold(data.cargo_hold_size);
        this.spacedockRepository = spacedockRepository;
        this.destinationSpacedock = spacedockRepository.getSpacedockByName(data.position);
        this.arriveAtDestination();
        this.cardView = new StarshipCardView(this, templateFactory);
        this.modalView = new StarshipModalView(this, templateFactory);

        if(name == "Millenium Falcon") {
            this.destinationSpacedock = spacedockRepository.getSpacedockByName("Corellia");
        }
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDestinationName(): string {
        return this.destinationSpacedock.getName();
    }

    public getEta(): string {
        const euclideanDistance = this.getDistanceToDestination();
        const ticks = Math.ceil(euclideanDistance / Starship.distancePerTick);
        return ticks > 0 ? ` in ${GameClock.ticksToTimeString(ticks)}` : "";
    }

    public getPosition(): Point {
        return this.position;
    }

    public getCargoHold(): ICargoHoldInfo {
        return this.cargoHold;
    }

    public getPossibleDestinations(): string[] {
        return this.spacedockRepository.getAllSpacedockNames();
    }

    public moveToDestination(destination: string): void {
        this.destinationSpacedock = this.spacedockRepository.getSpacedockByName(destination);
    }

    public update(): void {
        this.moveTowardsDestination();
        this.cardView.update();
        this.modalView.update();
    }

    private moveTowardsDestination(): void {
        const euclideanDistance = this.getDistanceToDestination();
        if(euclideanDistance == 0) {
            return;
        }
        if(euclideanDistance <= Starship.distancePerTick) {
            this.arriveAtDestination();
            return;
        }
        const pointDifference = this.position.subtract(this.destinationSpacedock.getPosition());
        const deltaX = -pointDifference.getX() * Starship.distancePerTick / euclideanDistance;
        const deltaY = -pointDifference.getY() * Starship.distancePerTick / euclideanDistance;

        this.position = this.position.add(new Point(deltaX, deltaY));
    }

    private getDistanceToDestination(): number {
        return this.position.euclideanDistanceTo(this.destinationSpacedock.getPosition());
    }

    private arriveAtDestination(): void {
        this.position = this.destinationSpacedock.getPosition();
        this.destinationSpacedock.dockArrivingStarship(this);
    }
}