class DiscardPileCardSelector extends CardSelector{
    private page: DiscardPilePage;
    private cardManager: CardManager;

    constructor(container: HTMLElement, card : Card, page: DiscardPilePage, cardManager: CardManager){
        super(container, card);

        this.page = page;
        this.cardManager = cardManager;
    }

    protected onClick() : void{
        super.onClick();

        this.cardManager.unstackDiscardPile(this.card);
        this.page.toDraw(this);
    }
}