abstract class HTMLComponent{
    protected htmlElement : HTMLElement;
    private children : Array<HTMLComponent>;
    private htmlListeners : Array<[HTMLElement | Window, string, (event: Event) => void]>;

    private visible : boolean;

    public constructor(container : HTMLElement, htmlElement : HTMLElement){
        this.htmlElement = htmlElement;
        this.children = [];
        this.htmlListeners = [];

        this.visible = true;

        container.appendChild(this.htmlElement);
    }

    public getElement() : HTMLElement{
        return this.htmlElement;
    }

    protected appendChild(child : HTMLComponent, appendToHTML : boolean = true) : void{
        this.children.push(child);

        if(appendToHTML){
            this.htmlElement.appendChild(child.getElement());
        }
    }

    protected removeChild(child : HTMLComponent, removeFromHTML : boolean = true) : void{
        const index = this.children.indexOf(child);
        if(index != -1){
            this.children.splice(index, 1);
            if(removeFromHTML){
                child.clear();
            }
        }
    }

    public createListenerHTML(observable: HTMLElement|Window, event: string, listener : (event: Event) => void) : void{
        this.htmlListeners.push([observable, event, listener]);
        observable.addEventListener(event, listener);
    }

    public clear() : void{
        for(let child of this.children){
            child.clear();
        }

        for(let [observable, event, listener] of this.htmlListeners){
            observable.removeEventListener(event, listener);
        }

        this.htmlElement.remove();
    }

    public setVisible(visible: boolean) : void{
        this.visible = visible;
    }

    public render(updateChildren : boolean = true) : void{
        if(updateChildren){
            for(let child of this.children){
                child.render();
            }
        }

        this.htmlElement.hidden = !this.visible;
    }

    public isHover(x: number, y: number) : boolean{
        const rect = this.htmlElement.getBoundingClientRect();
        return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
    }
}