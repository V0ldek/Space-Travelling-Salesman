export interface ICargoHoldInfo {

}

export class CargoHold {
    private readonly capacity: number;

    public constructor(capacity: number) {
        this.capacity = capacity;
    }
}