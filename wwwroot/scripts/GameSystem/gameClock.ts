import {Format} from "../format.js"
import {IUpdateable} from "./updateable.js";

export interface ITimeInfo {
    getRemainingTicks(): number;
}

export class GameClock implements ITimeInfo {
    private static readonly tickDuration = 1000;
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

    public getRemainingTicks(): number {
        const result = this.maximalTicks - this.elapsedTicks;
        return result >= 0 ? result : 0;
    }

    public static ticksToTimeString(ticks: number): string {
        const totalSeconds = ticks * GameClock.tickDuration / 1000;
        const minutesPart = Math.floor(totalSeconds / 60);
        const secondsPart = totalSeconds % 60;

        return Format.minutesAndSecondsToTimeString(minutesPart, secondsPart);
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
}