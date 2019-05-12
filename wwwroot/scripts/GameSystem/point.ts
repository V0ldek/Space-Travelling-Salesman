export class Point {
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

    public euclideanDistanceTo(other: Point): number {
        const deltaX = this.x - other.x;
        const deltaY = this.y - other.y;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    public add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    public subtract(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }
}