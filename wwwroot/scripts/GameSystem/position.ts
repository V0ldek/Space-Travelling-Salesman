export interface IPositionInfo {
    getX(): number;
    getY(): number;
    euclideanDistanceTo(other: IPositionInfo): number;
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

    public euclideanDistanceTo(other: IPositionInfo): number {
        const deltaX = this.x - other.getX();
        const deltaY = this.y - other.getY();
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
}