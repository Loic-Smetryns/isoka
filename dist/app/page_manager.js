"use strict";
class PageManager {
    constructor(cardManager) {
        const selectionPage = new SelectionPage(document.body, this, cardManager);
        const playgroundPage = new PlaygroundPage(document.body, this, cardManager);
        const discardPage = new DiscardPilePage(document.body, this, cardManager);
        this.pages = {
            [Page.PLAYGROUND]: playgroundPage,
            [Page.SELECTION]: selectionPage,
            [Page.DISCARD_PILE]: discardPage,
        };
        this.page = Page.SELECTION;
        this.pages[this.page].setVisible(true);
        this.pages[this.page].render();
    }
    initPlayground(selectedCards) {
        this.pages[Page.PLAYGROUND].init(selectedCards);
    }
    initPlaygroundWithPositions(selectedCards) {
        this.pages[Page.PLAYGROUND].initWithPositions(selectedCards);
    }
    updatePlaygroundDiscardPile(selectedCards) {
        this.pages[Page.PLAYGROUND].toDrawFromDiscardPile(selectedCards);
    }
    initDiscardPile() {
        this.pages[Page.DISCARD_PILE].init();
    }
    changePage(page) {
        this.pages[this.page].setVisible(false);
        this.pages[this.page].render();
        this.page = page;
        this.pages[this.page].setVisible(true);
        this.pages[this.page].render();
    }
}
var Page;
(function (Page) {
    Page[Page["SELECTION"] = 0] = "SELECTION";
    Page[Page["PLAYGROUND"] = 1] = "PLAYGROUND";
    Page[Page["DISCARD_PILE"] = 2] = "DISCARD_PILE";
})(Page || (Page = {}));
