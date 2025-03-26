class StackComponent extends HTMLComponent {
    private flownHover : boolean;
    private open : boolean;

    protected playgroundPage : PlaygroundPage;
    protected cardManager: CardManager;

    public constructor(container : HTMLElement, htmlElement : HTMLElement, playgroundPage: PlaygroundPage, cardManager: CardManager){
        super(container, htmlElement);

        this.flownHover = false;
        this.open = true;

        this.playgroundPage = playgroundPage;
        this.cardManager = cardManager;
    }

    public isOpen() : boolean{
        return this.open;
    }

    public setOpen(open: boolean){
        this.open = open;
    }

    public updateFlownHover(x: number, y: number) : void{
        const flownHover = !this.open ? false : (this.playgroundPage.getSelected() !== null && this.isHover(x, y));

        if(this.flownHover != flownHover){
            this.flownHover = flownHover;
            this.render();
        }
    }

    public render() : void{
        super.render();

        this.htmlElement.classList.remove("empty");
        this.htmlElement.classList.remove("not-empty");
        this.htmlElement.classList.remove("flown-hover");
        
        if(this.flownHover)
            this.htmlElement.classList.add("flown-hover");
    }
}