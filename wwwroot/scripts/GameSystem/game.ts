import {IGameData} from "../GameData/gameData.js";
import {TemplateFactory} from "../Templates/templateFactory.js";
import {PlayerState} from "../Player/playerState.js";
import {GameDataParser} from "../GameData/gameDataParser.js";
import {StarshipManager} from "../Starships/starshipManager.js";
import {PlanetManager} from "../Planets/planetManager.js";
import {GameClock} from "./Clock/gameClock.js";

export class Game {
    private readonly gameData: IGameData;
    private readonly templateFactory: TemplateFactory;
    private readonly playerState: PlayerState;
    private readonly gameClock: GameClock;
    private readonly planetManager: PlanetManager;
    private readonly starshipManager: StarshipManager;

    public constructor() {
        this.gameData = GameDataParser.parse();
        this.templateFactory = new TemplateFactory();
        this.gameClock = new GameClock(this.gameData.game_duration);
        this.playerState = new PlayerState(
            this.gameData.initial_credits,
            "V0ldek",
            this.gameClock,
            this.templateFactory);
        this.planetManager = new PlanetManager(this.gameData.planets, this.playerState, this.templateFactory);
        this.starshipManager = new StarshipManager(this.gameData.starships, this.planetManager, this.templateFactory);
        this.registerUpdates();
        this.gameClock.start();
    }

    private registerUpdates(): void {
        this.gameClock.registerUpdateable(this.starshipManager);
        this.gameClock.registerUpdateable(this.planetManager);
        this.gameClock.registerUpdateable(this.playerState);
    }
}