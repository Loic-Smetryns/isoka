"use strict";
class DeckComponent extends StackComponent {
    constructor(container, playgroundPage, cardManager) {
        super(container, HtmlHelper.makeElement("div", "", ["deck"]), playgroundPage, cardManager);
        this.htmlElement.appendChild(HtmlHelper.makeElement("div", "", ["deck-cover"]));
        this.createListenerHTML(this.htmlElement, "mousedown", (event) => { this.onPressed(event); });
        this.render();
    }
    onPressed(event) {
        this.playgroundPage.toDraw(event.x, event.y);
    }
    render() {
        super.render();
        this.htmlElement.classList.remove("empty");
        this.htmlElement.classList.remove("not-empty");
        this.htmlElement.classList.add(this.cardManager.deckEmpty() ? "empty" : "not-empty");
    }
}
