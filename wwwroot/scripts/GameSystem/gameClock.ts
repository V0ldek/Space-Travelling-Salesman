import {Format} from "../format.js"

export interface IUpdateable {
    update(): void;
}

export interface ITimeInfo {
    getRemainingTimeString(): string;
}

export class GameClock implements ITimeInfo {
    public static readonly tickDuration = 1000;
    private readonly updateables: IUpdateable[] = [];
    private readonly maximalTicks: number;
    private elapsedTicks: number = 0;

    public constructor(maximalTicks: number) {
        this.maximalTicks = maximalTicks;
    }

    public start() {
        this.elapsedTicks = 0;
        setInterval(() => this.update(), GameClock.tickDuration);
    }

    public registerUpdateable(updateable: IUpdateable): void {
        this.updateables.push(updateable);
    }

    public getRemainingTimeString(): string {
        const remainingSeconds = this.getRemainingTicks() * GameClock.tickDuration / 1000;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        return Format.minutesAndSecondsToTimeString(minutes, seconds);
    }

    private update(): void {
        if(this.getRemainingTicks() == 0) {
            return;
        }
        ++this.elapsedTicks;
        for(const updateable of this.updateables) {
            updateable.update();
        }
    }

    private getRemainingTicks(): number {
        const result = this.maximalTicks - this.elapsedTicks;
        return result >= 0 ? result : 0;
    }
}