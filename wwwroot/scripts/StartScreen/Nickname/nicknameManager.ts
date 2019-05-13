import {Storage} from "../../storage.js"

export class NicknameManager {
    private static readonly NicknameKey: string = "nickname";

    public static getCurrentNickname(): string {
        return Storage.getItemFromSessionStorage(`${NicknameManager.NicknameKey}`);
    }

    public static setCurrentNickname(nickname: string): void {
        Storage.addItemToSessionStorage(`${NicknameManager.NicknameKey}`, nickname);
    }
}