import {IStarship} from "../GameData/starship.js";
import {ITemplateFactory} from "../Templates/templateFactory.js";
import {Point} from "../GameSystem/point.js";
import {ISpacedock} from "../Planets/spacedock.js";
import {CargoHold} from "./cargoHold.js";
import {StarshipCardView} from "../Views/Starships/starshipCardView.js";
import {ISpacedockRepository} from "../Planets/spacedockRepository.js";
import {IUpdateable} from "../GameSystem/updateable.js";
import {StarshipModalView} from "../Views/Starships/starshipModalView.js";
import {IStarshipInfo} from "./starshipInfo.js";

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

    public constructor(id: number,
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
        this.modalView = new StarshipModalView(this, spacedockRepository, templateFactory);
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

    public getEtaTo(spacedockName: string): number {
        const euclideanDistance = this.getDistanceToSpacedock(
            this.spacedockRepository.getSpacedockByName(spacedockName));
        return Math.ceil(euclideanDistance / Starship.distancePerTick);
    }

    public getEtaToCurrentDestination(): number {
        return this.getEtaTo(this.destinationSpacedock.getName());
    }

    public getPosition(): Point {
        return this.position;
    }

    public getCargoHold(): CargoHold {
        return this.cargoHold;
    }

    public getPossibleDestinations(): string[] {
        return this.spacedockRepository.getAllSpacedockNames().filter(
            d => d !== this.destinationSpacedock.getName());
    }

    public moveToDestination(destination: string): void {
        this.destinationSpacedock.checkOutDepartingStarship(this.getName());
        this.destinationSpacedock = this.spacedockRepository.getSpacedockByName(destination);
    }

    public update(): void {
        this.moveTowardsDestination();
        this.cardView.update();
        this.modalView.update();
    }

    private moveTowardsDestination(): void {
        const euclideanDistance = this.getDistanceToSpacedock(this.destinationSpacedock);
        if (euclideanDistance == 0) {
            return;
        }
        if (euclideanDistance <= Starship.distancePerTick) {
            this.arriveAtDestination();
            return;
        }
        const pointDifference = this.position.subtract(this.destinationSpacedock.getPosition());
        const deltaX = -pointDifference.getX() * Starship.distancePerTick / euclideanDistance;
        const deltaY = -pointDifference.getY() * Starship.distancePerTick / euclideanDistance;

        this.position = this.position.add(new Point(deltaX, deltaY));
    }

    private getDistanceToSpacedock(spacedock: ISpacedock): number {
        return this.position.euclideanDistanceTo(spacedock.getPosition());
    }

    private arriveAtDestination(): void {
        this.position = this.destinationSpacedock.getPosition();
        this.destinationSpacedock.dockArrivingStarship(this);
    }
}