import {ITemplateFactory} from "../Templates/templateFactory.js";
import {RenderedTemplate} from "../Templates/renderedTemplate.js";
import {IUpdateable} from "../GameSystem/updateable.js";
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
        this.renderedTemplate.getElement().toggleAttribute("hidden");
    }

    protected abstract getData(): IDictionary<string>;

    private renderView(root: HTMLElement): RenderedTemplate {
        return root == null
            ? this.templateFactory.createTemplate(this.name)
            : this.templateFactory.createTemplate(this.name, root);
    }
}