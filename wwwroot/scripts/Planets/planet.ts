import {IPlanet} from "../GameData/gameDataParser.js";
import {Position} from "../GameSystem/Position.js";

export class Planet {
    private readonly name: string;
    private readonly position: Position;


    public constructor(name: string, data: IPlanet) {
        this.name = name;
        this.loadData(data);
    }

    private loadData(data: IPlanet): void {

    }
}