import {TemplateFactory} from "../Templates/templateFactory.js";
import {GameClock} from "./gameClock.js";
import {GameDataParser, IGameData} from "../GameData/gameDataParser.js";
import {PlayerState} from "../Player/playerState.js";
import {GameSummaryView} from "../Views/gameSummaryView.js";
import {PlanetManager} from "../Planets/planetManager.js";

export class Game {
    private readonly gameData: IGameData;
    private readonly templateManager: TemplateFactory;
    private readonly playerState: PlayerState;
    private readonly gameClock: GameClock;
    private readonly gameSummaryView: GameSummaryView;
    private readonly planetManager: PlanetManager;

    public constructor() {
        this.gameData = GameDataParser.parse();
        this.templateManager = new TemplateFactory();
        this.playerState = new PlayerState(this.gameData.initial_credits, "V0ldek");
        this.gameClock = new GameClock(this.gameData.game_duration);
        this.gameSummaryView = new GameSummaryView(
            this.playerState,
            this.playerState,
            this.gameClock,
            this.templateManager);
        this.planetManager = new PlanetManager(this.gameData.planets);

        this.registerLogicUpdates();
        this.registerViewUpdates();

        this.gameClock.start();
    }

    private registerLogicUpdates(): void {

    }

    private registerViewUpdates(): void {
        this.gameClock.registerUpdateable(this.gameSummaryView);
    }
}


// legacy

document.querySelectorAll(".modal-trigger").forEach(modalTrigger => {
    const targetId = modalTrigger.getAttribute("data-target");
    const target = document.querySelector(targetId);
    modalTrigger.addEventListener("click", () => {
        target.removeAttribute("hidden");
    });
});

window.addEventListener("click", e => {
    const target = e.target as HTMLLIElement;

    if (target && target.classList.contains("modal")) {
        target.setAttribute("hidden", "");
    }
});

window.addEventListener("keydown", e => {
    if (e.key !== "Escape") {
        return;
    }

    document.querySelectorAll(".modal").forEach(modal => {
        modal.setAttribute("hidden", "");
    });
});