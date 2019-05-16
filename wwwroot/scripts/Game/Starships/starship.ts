import {IStarship} from "../GameData/starship.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {Point} from "../GameSystem/point.js";
import {IStardock} from "../Planets/stardock.js";
import {CargoHold} from "./cargoHold.js";
import {StarshipCardView} from "../Views/Starships/starshipCardView.js";
import {IStardockRepository} from "../Planets/stardockRepository.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {StarshipModalView} from "../Views/Starships/starshipModalView.js";
import {IStarshipInfo} from "./starshipInfo.js";

export class Starship implements IStarshipInfo, IUpdateable {
    private static readonly distancePerTick: number = 1.0;

    private readonly id: number;
    private readonly name: string;
    private readonly cargoHold: CargoHold;
    private readonly stardockRepository: IStardockRepository;
    private readonly cardView: StarshipCardView;
    private readonly modalView: StarshipModalView;
    private destinationStardock: IStardock;
    private position: Point;

    public constructor(id: number,
                       name: string,
                       data: IStarship,
                       stardockRepository: IStardockRepository,
                       templateFactory: ITemplateFactory) {
        this.id = id;
        this.name = name;
        this.cargoHold = new CargoHold(data.cargo_hold_size);
        this.stardockRepository = stardockRepository;
        this.destinationStardock = stardockRepository.getStardockByName(data.position);
        this.arriveAtDestination();
        this.cardView = new StarshipCardView(this, templateFactory);
        this.modalView = new StarshipModalView(this, stardockRepository, templateFactory);
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDestinationName(): string {
        return this.destinationStardock.getName();
    }

    public getEtaTo(stardockName: string): number {
        const euclideanDistance = this.getDistanceToStardock(
            this.stardockRepository.getStardockByName(stardockName));
        return Math.ceil(euclideanDistance / Starship.distancePerTick);
    }

    public getEtaToCurrentDestination(): number {
        return this.getEtaTo(this.destinationStardock.getName());
    }

    public getPosition(): Point {
        return this.position;
    }

    public getCargoHold(): CargoHold {
        return this.cargoHold;
    }

    public getPossibleDestinations(): string[] {
        return this.stardockRepository.getAllStardockNames().filter(
            d => d !== this.destinationStardock.getName());
    }

    public moveToDestination(destination: string): void {
        this.destinationStardock.checkOutDepartingStarship(this.getName());
        this.destinationStardock = this.stardockRepository.getStardockByName(destination);
    }

    public update(): void {
        this.moveTowardsDestination();
        this.cardView.update();
        this.modalView.update();
    }

    private moveTowardsDestination(): void {
        const euclideanDistance = this.getDistanceToStardock(this.destinationStardock);
        if (euclideanDistance == 0) {
            return;
        }
        if (euclideanDistance <= Starship.distancePerTick) {
            this.arriveAtDestination();
            return;
        }
        const pointDifference = this.position.subtract(this.destinationStardock.getPosition());
        const deltaX = -pointDifference.getX() * Starship.distancePerTick / euclideanDistance;
        const deltaY = -pointDifference.getY() * Starship.distancePerTick / euclideanDistance;

        this.position = this.position.add(new Point(deltaX, deltaY));
    }

    private getDistanceToStardock(stardock: IStardock): number {
        return this.position.euclideanDistanceTo(stardock.getPosition());
    }

    private arriveAtDestination(): void {
        this.position = this.destinationStardock.getPosition();
        this.destinationStardock.dockArrivingStarship(this);
    }
}