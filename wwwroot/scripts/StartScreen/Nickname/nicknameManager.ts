export class NicknameManager {
    public static readonly cookieName: string = "STS_USER";
    private static readonly DefaultNickname: string = "Guest";

    public static getCurrentNickname(): string {
        const cookie = document.cookie
            .split(";")
            .map(c => c.trim())
            .filter(c => c.substring(0, this.cookieName.length + 1) === `${this.cookieName}=`)
            .map(c => decodeURIComponent(c.substring(this.cookieName.length + 1)))
            [0] || null;

        return cookie ? cookie : this.DefaultNickname;
    }

    static isGuest() {
        return this.getCurrentNickname() == this.DefaultNickname;
    }
}