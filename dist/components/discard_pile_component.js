"use strict";
class DiscardPileComponent extends StackComponent {
    constructor(container, playgroundPage, cardManager) {
        super(container, HtmlHelper.makeElement("div", "", ["discard"]), playgroundPage, cardManager);
        this.topCard = HtmlHelper.makeElement("div", "", ["discard-top"]);
        this.htmlElement.appendChild(this.topCard);
        this.createListenerHTML(this.htmlElement, "click", (event) => { this.onClick(event); });
        this.render();
    }
    onClick(event) {
        this.playgroundPage.displayDiscard();
    }
    render() {
        super.render();
        this.htmlElement.classList.remove("empty");
        this.htmlElement.classList.remove("not-empty");
        if (this.cardManager.discardEmpty()) {
            this.htmlElement.classList.add("empty");
            this.topCard.style.backgroundImage = "";
        }
        else {
            this.htmlElement.classList.add("not-empty");
            this.topCard.style.backgroundImage = ResourceHelper.getUrl(this.cardManager.getDiscardPileTopCard());
        }
    }
}
