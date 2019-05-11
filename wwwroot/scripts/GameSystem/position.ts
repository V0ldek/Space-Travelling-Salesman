export interface IPositionInfo {
    getX(): number;
    getY(): number;
}

export class Position implements IPositionInfo{
    private readonly x: number;
    private readonly y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}