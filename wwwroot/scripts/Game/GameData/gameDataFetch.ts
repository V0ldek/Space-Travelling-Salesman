import {IGameData} from "./gameData.js";

export class GameDataFetch {
    public static fetch(mapId: number): Promise<IGameData> {
        return fetch(`/maps/${mapId}`, {
            method: "get"
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log("Twoja stara");
                return response.json();
            } else {
                console.log("Zapierdala");
                response.text()
                    .then(message => {
                        throw new Error(message);
                    });
            }
        });
    }
}