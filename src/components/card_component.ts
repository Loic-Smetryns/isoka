class CardComponent extends HTMLComponent{
    public static readonly WIDTH = 196;
    public static readonly HEIGHT = 300;

    private static top: number = 1;

    private x: number;
    private y: number;
    private z: number;

    private playgroundPage: PlaygroundPage;
    private card: Card;

    public constructor(container: HTMLElement, playgroundPage: PlaygroundPage, card: Card){
        super(container, HtmlHelper.makeElement("div", "", ["card"]));

        this.playgroundPage = playgroundPage;
        this.card = card;
        this.htmlElement.style.backgroundImage = ResourceHelper.getUrl(card);

        this.createListenerHTML(window, "resize", (event: Event) => this.onWindowResize(event));
        this.createListenerHTML(this.htmlElement, "mousedown", (event: Event) => this.onPressed(<MouseEvent> event));

        this.x = 0;
        this.y = 0;
        this.z = 1;

        this.setVisible(false);
        this.render();
    }

    private onWindowResize(event: Event) : void{
        this.render();
    }

    private onPressed(event: MouseEvent) : void{
        if(event.button !== 0)
            return;

        this.x = (this.x <= 0) ? 0 : (this.x + CardComponent.WIDTH >= window.innerWidth) ? window.innerWidth - CardComponent.WIDTH : this.x;
        this.y = (this.y <= 0) ? 0 : (this.y + CardComponent.HEIGHT >= window.innerHeight) ? window.innerHeight - CardComponent.HEIGHT : this.y;

        this.playgroundPage.select(this, event.x-this.x, event.y-this.y);
    }

    public move(x: number, y: number) : void{
        this.x = x;
        this.y = y;

        this.render();
    }

    public goFront() : void{
        this.z = ++CardComponent.top;
        this.render();
    }

    public take() : void {
        this.goFront();
        this.htmlElement.classList.add("card-take");
    }

    public drop() : void {
        this.htmlElement.classList.remove("card-take");
    }

    public stack() : void{
        this.setVisible(false);
        this.render();
    }

    public unstack(x: number, y: number) : void {
        this.goFront();
        this.move(x - CardComponent.WIDTH/2, y-CardComponent.HEIGHT/2);
        this.setVisible(true);
        this.render();
    }

    public render() : void {
        super.render();

        let x = (this.x + CardComponent.WIDTH/2 <= 0) ? -CardComponent.WIDTH/2 : (this.x + CardComponent.WIDTH/2 >= window.innerWidth) ? window.innerWidth - CardComponent.WIDTH/2 : this.x;
        let y = (this.y + CardComponent.HEIGHT/2 <= 0) ? -CardComponent.HEIGHT/2 : (this.y + CardComponent.HEIGHT/2 >= window.innerHeight) ? window.innerHeight - CardComponent.HEIGHT/2 : this.y;

        this.htmlElement.style.top = y+"px";
        this.htmlElement.style.left = x+"px";
        this.htmlElement.style.zIndex = ""+this.z;
    }

    public getCard() : Card {
        return this.card;
    }

    public getSave() : any{
        const json : any = {};
        json.color = this.card.getColor();
        json.value = this.card.getValue();
        json.x = this.x;
        json.y = this.y;
        return json;
    }
}