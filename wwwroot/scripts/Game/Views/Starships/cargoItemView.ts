import {ICargoItemInfo} from "../../Starships/cargoItemInfo.js";
import {ITemplateFactory} from "../../Templates/templateFactory.js";
import {IDictionary} from "../../../dictionary.js";
import {View} from "../../../Views/view.js";

export class CargoItemView extends View {
    private readonly cargoItemInfo: ICargoItemInfo;

    public constructor(cargoItemInfo: ICargoItemInfo, root: HTMLElement, templateFactory: ITemplateFactory) {
        super("starship-cargo-item", templateFactory, root);
        this.cargoItemInfo = cargoItemInfo;
        this.update();
    }

    protected getData(): IDictionary<string> {
        return {
            name: this.cargoItemInfo.getName(),
            amount: this.cargoItemInfo.getAmount().toString()
        }
    }
}