import {IUpdateable} from "../updateable.js";

export interface IUpdateManager {
    registerUpdateable(updateable: IUpdateable): void;
}