"use strict";
class DiscardPileCardSelector extends CardSelector {
    constructor(container, card, page, cardManager) {
        super(container, card);
        this.page = page;
        this.cardManager = cardManager;
    }
    onClick() {
        super.onClick();
        this.cardManager.unstackDiscardPile(this.card);
        this.page.toDraw(this);
    }
}
