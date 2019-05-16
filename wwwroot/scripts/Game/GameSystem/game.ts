import {IGameData} from "../GameData/gameData.js";
import {TemplateFactory} from "../Templates/templateFactory.js";
import {PlayerState} from "../Player/playerState.js";
import {GameDataParser} from "../GameData/gameDataParser.js";
import {StarshipManager} from "../Starships/starshipManager.js";
import {PlanetManager} from "../Planets/planetManager.js";
import {GameClock} from "./Clock/gameClock.js";
import {NicknameManager} from "../../StartScreen/Nickname/nicknameManager.js";
import {IUpdateable} from "./updateable.js";
import {Leaderboard} from "../../StartScreen/Leaderboard/leaderboard.js";
import {GameOverView} from "../Views/gameOverView.js";
import {MapView} from "../../Views/Map/mapView.js";

export class Game implements IUpdateable {
    private readonly gameData: IGameData;
    private readonly templateFactory: TemplateFactory;
    private readonly playerState: PlayerState;
    private readonly gameClock: GameClock;
    private readonly planetManager: PlanetManager;
    private readonly starshipManager: StarshipManager;
    private readonly gameMap: MapView;
    private gameOverView: GameOverView;

    public constructor() {
        this.gameData = GameDataParser.parse();
        this.templateFactory = new TemplateFactory();
        this.gameClock = new GameClock(this.gameData.game_duration);
        this.playerState = new PlayerState(
            this.gameData.initial_credits,
            NicknameManager.getCurrentNickname(),
            this.gameClock,
            this.templateFactory);
        this.planetManager = new PlanetManager(this.gameData.planets, this.playerState, this.templateFactory);
        this.starshipManager = new StarshipManager(this.gameData.starships, this.planetManager, this.templateFactory);
        this.gameMap = new MapView(this.planetManager, this.starshipManager, this.templateFactory);
        this.registerUpdates();
        this.gameClock.start();
    }

    public update(): void {
        if (this.gameClock.getRemainingTicks() == 0) {
            Leaderboard.saveScore(this.playerState.getNickname(), this.playerState.getCredits());
            this.gameOverView = new GameOverView(this.playerState, this.templateFactory);
        }
    }

    private registerUpdates(): void {
        this.gameClock.registerUpdateable(this.starshipManager);
        this.gameClock.registerUpdateable(this.planetManager);
        this.gameClock.registerUpdateable(this.playerState);
        this.gameClock.registerUpdateable(this.gameMap);
        this.gameClock.registerUpdateable(this);
    }
}