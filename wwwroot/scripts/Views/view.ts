import {ITemplateFactory} from "../Game/Templates/templateFactory.js";
import {RenderedTemplate} from "../Game/Templates/renderedTemplate.js";
import {IUpdateable} from "../Game/GameSystem/updateable.js";
import {IDictionary} from "../dictionary.js";

export abstract class View implements IUpdateable {
    protected readonly name: string;
    protected readonly renderedTemplate: RenderedTemplate;
    protected templateFactory: ITemplateFactory;

    protected constructor(name: string, templateFactory: ITemplateFactory, root: HTMLElement = null) {
        this.name = name;
        this.templateFactory = templateFactory;
        this.renderedTemplate = this.renderView(root);
    }

    public update(): void {
        this.renderedTemplate.renderData(this.getData())
    };

    public remove(): void {
        this.renderedTemplate.remove();
    }

    public toggle(): void {
        // toggleAttribute does not work on the lab version of Firefox.
        const element = this.renderedTemplate.getElement();
        if (element.getAttribute("hidden")) {
            element.removeAttribute("hidden");
        } else {
            element.setAttribute("hidden", "");
        }
    }

    protected abstract getData(): IDictionary<string>;

    private renderView(root: HTMLElement): RenderedTemplate {
        return root == null
            ? this.templateFactory.createTemplate(this.name)
            : this.templateFactory.createTemplate(this.name, root);
    }
}