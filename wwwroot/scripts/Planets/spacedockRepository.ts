import {ISpacedock} from "./spacedock.js";

export interface ISpacedockRepository {
    getAllSpacedockNames(): string[];

    getSpacedockByName(name: string): ISpacedock;
}