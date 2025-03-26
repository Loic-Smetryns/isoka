class PageManager{
    private pages : { [key in Page]: PageComponent }
    private page : Page;

    public constructor(cardManager: CardManager){
        const selectionPage : SelectionPage = new SelectionPage(document.body, this, cardManager);
        const playgroundPage : PlaygroundPage = new PlaygroundPage(document.body, this, cardManager);
        const discardPage : DiscardPilePage = new DiscardPilePage(document.body, this, cardManager);

        this.pages = {
            [ Page.PLAYGROUND ] : playgroundPage,
            [ Page.SELECTION ] : selectionPage,
            [ Page.DISCARD_PILE ] : discardPage,
        };

        this.page = Page.SELECTION;

        this.pages[this.page].setVisible(true);
        this.pages[this.page].render();
    }

    public initPlayground(selectedCards : Array<[CardState, Card]>) : void{
        (<PlaygroundPage> this.pages[Page.PLAYGROUND]).init(selectedCards);
    }

    public initPlaygroundWithPositions(selectedCards : Array<[CardState, Card, number, number]>) : void{
        (<PlaygroundPage> this.pages[Page.PLAYGROUND]).initWithPositions(selectedCards);
    }

    public updatePlaygroundDiscardPile(selectedCards : Array<Card>) : void{
        (<PlaygroundPage> this.pages[Page.PLAYGROUND]).toDrawFromDiscardPile(selectedCards);
    }

    public initDiscardPile() : void{
        (<DiscardPilePage> this.pages[Page.DISCARD_PILE]).init();
    }

    public changePage(page: Page): void{
        this.pages[this.page].setVisible(false);
        this.pages[this.page].render();

        this.page = page;

        this.pages[this.page].setVisible(true);
        this.pages[this.page].render();
    }
}

enum Page{
    SELECTION, PLAYGROUND, DISCARD_PILE
}
