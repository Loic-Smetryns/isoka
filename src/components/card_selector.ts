class CardSelector extends HTMLComponent{
    protected card: Card;

    public constructor(container: HTMLElement, card : Card){
        super(container, HtmlHelper.makeElement("div", "", ["card-selector"]));

        this.card = card;

        this.htmlElement.style.backgroundImage = ResourceHelper.getUrl(card);
        this.htmlElement.addEventListener("click", ()=>{ this.onClick(); });
    }

    protected onClick() : void { }

    public getCard() : Card { 
        return this.card;
    }
}