import {IDictionary} from "../dictionary.js";

export interface IItemStore {
    available: number;
    buy_price: number;
    sell_price: number;
}

export interface IPlanet {
    available_items: IDictionary<IItemStore>;
    x: number;
    y: number;
}

export interface IStarship {
    cargo_hold_size: number;
    initial_location: string;
}

export interface IGameData {
    game_duration: number;
    initial_credits: number;
    items: string[];
    planets: IDictionary<IPlanet>;
    starships: IDictionary<IStarship>;
}

export class GameDataParser {
    public static parse(): IGameData {
        return JSON.parse(GameDataParser.initial_data);
    }

    private static readonly initial_data = '{\n' +
        '  "game_duration": 300,\n' +
        '  "initial_credits": 1984,\n' +
        '  "items": [\n' +
        '    "Dwimeryt",\n' +
        '    "Cynamon",\n' +
        '    "Nuka-Cola",\n' +
        '    "Z\u0142oto",\n' +
        '    "Unobtainium",\n' +
        '    "Protea\u0144skie dyski",\n' +
        '    "Ziemniaki",\n' +
        '    "Lyrium",\n' +
        '    "Murkwie",\n' +
        '    "Woda"\n' +
        '  ],\n' +
        '  "planets": {\n' +
        '    "Alderaan": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 74,\n' +
        '          "buy_price": 6,\n' +
        '          "sell_price": 6\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 42,\n' +
        '          "buy_price": 12,\n' +
        '          "sell_price": 11\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 34,\n' +
        '          "buy_price": 13,\n' +
        '          "sell_price": 12\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 5,\n' +
        '          "buy_price": 76,\n' +
        '          "sell_price": 69\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 23,\n' +
        '          "buy_price": 33,\n' +
        '          "sell_price": 31\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 22,\n' +
        '          "buy_price": 19,\n' +
        '          "sell_price": 18\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 10,\n' +
        '          "buy_price": 92,\n' +
        '          "sell_price": 86\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 19,\n' +
        '          "sell_price": 17\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 15,\n' +
        '      "y": 32\n' +
        '    },\n' +
        '    "Argoland": {\n' +
        '      "available_items": {\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 23,\n' +
        '          "buy_price": 10,\n' +
        '          "sell_price": 10\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 39,\n' +
        '          "buy_price": 9,\n' +
        '          "sell_price": 8\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 5,\n' +
        '          "buy_price": 73,\n' +
        '          "sell_price": 64\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 25,\n' +
        '          "buy_price": 22,\n' +
        '          "sell_price": 19\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 10,\n' +
        '          "buy_price": 75,\n' +
        '          "sell_price": 65\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 69,\n' +
        '          "sell_price": 61\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 34,\n' +
        '          "sell_price": 30\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 59,\n' +
        '      "y": 44\n' +
        '    },\n' +
        '    "Arrakis": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 59,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 53,\n' +
        '          "buy_price": 10,\n' +
        '          "sell_price": 8\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 89,\n' +
        '          "sell_price": 76\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 25,\n' +
        '          "buy_price": 16,\n' +
        '          "sell_price": 15\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 7,\n' +
        '          "buy_price": 64,\n' +
        '          "sell_price": 57\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 36,\n' +
        '          "sell_price": 33\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 25,\n' +
        '          "sell_price": 21\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 9,\n' +
        '          "buy_price": 120,\n' +
        '          "sell_price": 107\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 16,\n' +
        '          "buy_price": 23,\n' +
        '          "sell_price": 21\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 81,\n' +
        '      "y": 34\n' +
        '    },\n' +
        '    "Corellia": {\n' +
        '      "available_items": {\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 38,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 8\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 63,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 91,\n' +
        '          "sell_price": 84\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 10,\n' +
        '          "buy_price": 74,\n' +
        '          "sell_price": 66\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 11,\n' +
        '          "buy_price": 30,\n' +
        '          "sell_price": 26\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 71,\n' +
        '          "sell_price": 66\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 19,\n' +
        '          "buy_price": 37,\n' +
        '          "sell_price": 33\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 43,\n' +
        '      "y": 69\n' +
        '    },\n' +
        '    "Encja": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 59,\n' +
        '          "buy_price": 6,\n' +
        '          "sell_price": 5\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 56,\n' +
        '          "buy_price": 10,\n' +
        '          "sell_price": 10\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 51,\n' +
        '          "buy_price": 9,\n' +
        '          "sell_price": 8\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 88,\n' +
        '          "sell_price": 76\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 35,\n' +
        '          "buy_price": 17,\n' +
        '          "sell_price": 16\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 9,\n' +
        '          "buy_price": 103,\n' +
        '          "sell_price": 90\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 13,\n' +
        '          "buy_price": 39,\n' +
        '          "sell_price": 37\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 32,\n' +
        '          "sell_price": 32\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 60,\n' +
        '          "sell_price": 57\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 26,\n' +
        '          "buy_price": 40,\n' +
        '          "sell_price": 35\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 91,\n' +
        '      "y": 32\n' +
        '    },\n' +
        '    "Gaia": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 80,\n' +
        '          "buy_price": 6,\n' +
        '          "sell_price": 6\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 85,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 41,\n' +
        '          "buy_price": 10,\n' +
        '          "sell_price": 9\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 9,\n' +
        '          "buy_price": 102,\n' +
        '          "sell_price": 94\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 25,\n' +
        '          "buy_price": 43,\n' +
        '          "sell_price": 39\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 8,\n' +
        '          "buy_price": 92,\n' +
        '          "sell_price": 82\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 16,\n' +
        '          "buy_price": 35,\n' +
        '          "sell_price": 31\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 75,\n' +
        '      "y": 76\n' +
        '    },\n' +
        '    "Ksi": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 33,\n' +
        '          "buy_price": 11,\n' +
        '          "sell_price": 10\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 80,\n' +
        '          "buy_price": 6,\n' +
        '          "sell_price": 6\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 64,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 4,\n' +
        '          "buy_price": 73,\n' +
        '          "sell_price": 67\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 30,\n' +
        '          "buy_price": 17,\n' +
        '          "sell_price": 14\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 8,\n' +
        '          "buy_price": 39,\n' +
        '          "sell_price": 37\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 41,\n' +
        '          "sell_price": 39\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 15,\n' +
        '          "buy_price": 30,\n' +
        '          "sell_price": 28\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 74,\n' +
        '          "sell_price": 64\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 16,\n' +
        '          "buy_price": 20,\n' +
        '          "sell_price": 18\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 91,\n' +
        '      "y": 71\n' +
        '    },\n' +
        '    "Leonida": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 36,\n' +
        '          "buy_price": 12,\n' +
        '          "sell_price": 11\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 50,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 60,\n' +
        '          "buy_price": 9,\n' +
        '          "sell_price": 9\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 89,\n' +
        '          "sell_price": 85\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 39,\n' +
        '          "buy_price": 18,\n' +
        '          "sell_price": 16\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 7,\n' +
        '          "buy_price": 65,\n' +
        '          "sell_price": 57\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 9,\n' +
        '          "buy_price": 38,\n' +
        '          "sell_price": 33\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 5,\n' +
        '          "buy_price": 121,\n' +
        '          "sell_price": 112\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 11,\n' +
        '          "buy_price": 45,\n' +
        '          "sell_price": 41\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 32,\n' +
        '      "y": 5\n' +
        '    },\n' +
        '    "NowWhat": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 62,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 22,\n' +
        '          "buy_price": 9,\n' +
        '          "sell_price": 9\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 9,\n' +
        '          "buy_price": 67,\n' +
        '          "sell_price": 66\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 27,\n' +
        '          "buy_price": 18,\n' +
        '          "sell_price": 16\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 9,\n' +
        '          "buy_price": 82,\n' +
        '          "sell_price": 71\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 4,\n' +
        '          "buy_price": 74,\n' +
        '          "sell_price": 63\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 17,\n' +
        '          "buy_price": 28,\n' +
        '          "sell_price": 24\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 35,\n' +
        '      "y": 41\n' +
        '    },\n' +
        '    "Sur\'Kesh": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 55,\n' +
        '          "buy_price": 9,\n' +
        '          "sell_price": 8\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 34,\n' +
        '          "buy_price": 9,\n' +
        '          "sell_price": 8\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 10,\n' +
        '          "buy_price": 73,\n' +
        '          "sell_price": 66\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 30,\n' +
        '          "buy_price": 19,\n' +
        '          "sell_price": 17\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 5,\n' +
        '          "buy_price": 85,\n' +
        '          "sell_price": 79\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 19,\n' +
        '          "buy_price": 34,\n' +
        '          "sell_price": 31\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 21,\n' +
        '          "buy_price": 23,\n' +
        '          "sell_price": 20\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 8,\n' +
        '          "buy_price": 99,\n' +
        '          "sell_price": 95\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 39,\n' +
        '      "y": 31\n' +
        '    },\n' +
        '    "Tairia": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 70,\n' +
        '          "buy_price": 10,\n' +
        '          "sell_price": 10\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 43,\n' +
        '          "buy_price": 6,\n' +
        '          "sell_price": 5\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 8,\n' +
        '          "buy_price": 97,\n' +
        '          "sell_price": 84\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 32,\n' +
        '          "buy_price": 20,\n' +
        '          "sell_price": 19\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 19,\n' +
        '          "buy_price": 44,\n' +
        '          "sell_price": 41\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 29,\n' +
        '          "sell_price": 25\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 123,\n' +
        '          "sell_price": 103\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 14,\n' +
        '          "buy_price": 37,\n' +
        '          "sell_price": 34\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 36,\n' +
        '      "y": 84\n' +
        '    },\n' +
        '    "Tatooine": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 60,\n' +
        '          "buy_price": 11,\n' +
        '          "sell_price": 10\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 64,\n' +
        '          "buy_price": 10,\n' +
        '          "sell_price": 9\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 45,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 81,\n' +
        '          "sell_price": 71\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 39,\n' +
        '          "buy_price": 15,\n' +
        '          "sell_price": 13\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 7,\n' +
        '          "buy_price": 89,\n' +
        '          "sell_price": 84\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 13,\n' +
        '          "buy_price": 37,\n' +
        '          "sell_price": 32\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 10,\n' +
        '          "buy_price": 23,\n' +
        '          "sell_price": 21\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 7,\n' +
        '          "buy_price": 95,\n' +
        '          "sell_price": 87\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 19,\n' +
        '          "buy_price": 35,\n' +
        '          "sell_price": 32\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 47,\n' +
        '      "y": 68\n' +
        '    },\n' +
        '    "Tuchanka": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 59,\n' +
        '          "buy_price": 10,\n' +
        '          "sell_price": 9\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 51,\n' +
        '          "buy_price": 7,\n' +
        '          "sell_price": 6\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 65,\n' +
        '          "buy_price": 11,\n' +
        '          "sell_price": 10\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 9,\n' +
        '          "buy_price": 90,\n' +
        '          "sell_price": 82\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 46,\n' +
        '          "buy_price": 18,\n' +
        '          "sell_price": 16\n' +
        '        },\n' +
        '        "Protea\u0144skie dyski": {\n' +
        '          "available": 10,\n' +
        '          "buy_price": 71,\n' +
        '          "sell_price": 65\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 8,\n' +
        '          "buy_price": 39,\n' +
        '          "sell_price": 37\n' +
        '        },\n' +
        '        "Woda": {\n' +
        '          "available": 15,\n' +
        '          "buy_price": 28,\n' +
        '          "sell_price": 24\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 10,\n' +
        '          "buy_price": 61,\n' +
        '          "sell_price": 57\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 12,\n' +
        '          "buy_price": 46,\n' +
        '          "sell_price": 40\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 27,\n' +
        '      "y": 76\n' +
        '    },\n' +
        '    "Ziemia": {\n' +
        '      "available_items": {\n' +
        '        "Cynamon": {\n' +
        '          "available": 58,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Dwimeryt": {\n' +
        '          "available": 106,\n' +
        '          "buy_price": 8,\n' +
        '          "sell_price": 7\n' +
        '        },\n' +
        '        "Lyrium": {\n' +
        '          "available": 31,\n' +
        '          "buy_price": 9,\n' +
        '          "sell_price": 8\n' +
        '        },\n' +
        '        "Murkwie": {\n' +
        '          "available": 7,\n' +
        '          "buy_price": 82,\n' +
        '          "sell_price": 75\n' +
        '        },\n' +
        '        "Nuka-Cola": {\n' +
        '          "available": 30,\n' +
        '          "buy_price": 18,\n' +
        '          "sell_price": 17\n' +
        '        },\n' +
        '        "Unobtainium": {\n' +
        '          "available": 21,\n' +
        '          "buy_price": 37,\n' +
        '          "sell_price": 36\n' +
        '        },\n' +
        '        "Ziemniaki": {\n' +
        '          "available": 6,\n' +
        '          "buy_price": 77,\n' +
        '          "sell_price": 69\n' +
        '        },\n' +
        '        "Z\u0142oto": {\n' +
        '          "available": 13,\n' +
        '          "buy_price": 38,\n' +
        '          "sell_price": 32\n' +
        '        }\n' +
        '      },\n' +
        '      "x": 94,\n' +
        '      "y": 24\n' +
        '    }\n' +
        '  },\n' +
        '  "starships": {\n' +
        '    "Axiom": {\n' +
        '      "cargo_hold_size": 27,\n' +
        '      "position": "Tatooine"\n' +
        '    },\n' +
        '    "Enterprise": {\n' +
        '      "cargo_hold_size": 46,\n' +
        '      "position": "Corellia"\n' +
        '    },\n' +
        '    "Goliath": {\n' +
        '      "cargo_hold_size": 33,\n' +
        '      "position": "Sur\'Kesh"\n' +
        '    },\n' +
        '    "Hermes": {\n' +
        '      "cargo_hold_size": 26,\n' +
        '      "position": "NowWhat"\n' +
        '    },\n' +
        '    "Millenium Falcon": {\n' +
        '      "cargo_hold_size": 35,\n' +
        '      "position": "Tatooine"\n' +
        '    },\n' +
        '    "Niezwyci\u0119\u017cony": {\n' +
        '      "cargo_hold_size": 60,\n' +
        '      "position": "Argoland"\n' +
        '    },\n' +
        '    "Normandy SR-2": {\n' +
        '      "cargo_hold_size": 40,\n' +
        '      "position": "Gaia"\n' +
        '    },\n' +
        '    "Nostromo": {\n' +
        '      "cargo_hold_size": 25,\n' +
        '      "position": "Arrakis"\n' +
        '    },\n' +
        '    "Rocinante": {\n' +
        '      "cargo_hold_size": 30,\n' +
        '      "position": "Alderaan"\n' +
        '    },\n' +
        '    "\u041a\u043e\u0441\u043c\u043e\u043d\u0430\u0432\u0442 \u0410\u043b\u0435\u043a\u0441\u0435\u0301\u0439 \u041b\u0435\u043e\u0301\u043d\u043e\u0432": {\n' +
        '      "cargo_hold_size": 35,\n' +
        '      "position": "Arrakis"\n' +
        '    }\n' +
        '  }\n' +
        '}';
}