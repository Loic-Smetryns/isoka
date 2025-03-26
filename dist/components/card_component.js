"use strict";
class CardComponent extends HTMLComponent {
    constructor(container, playgroundPage, card) {
        super(container, HtmlHelper.makeElement("div", "", ["card"]));
        this.playgroundPage = playgroundPage;
        this.card = card;
        this.htmlElement.style.backgroundImage = ResourceHelper.getUrl(card);
        this.createListenerHTML(window, "resize", (event) => this.onWindowResize(event));
        this.createListenerHTML(this.htmlElement, "mousedown", (event) => this.onPressed(event));
        this.x = 0;
        this.y = 0;
        this.z = 1;
        this.setVisible(false);
        this.render();
    }
    onWindowResize(event) {
        this.render();
    }
    onPressed(event) {
        if (event.button !== 0)
            return;
        this.x = (this.x <= 0) ? 0 : (this.x + CardComponent.WIDTH >= window.innerWidth) ? window.innerWidth - CardComponent.WIDTH : this.x;
        this.y = (this.y <= 0) ? 0 : (this.y + CardComponent.HEIGHT >= window.innerHeight) ? window.innerHeight - CardComponent.HEIGHT : this.y;
        this.playgroundPage.select(this, event.x - this.x, event.y - this.y);
    }
    move(x, y) {
        this.x = x;
        this.y = y;
        this.render();
    }
    goFront() {
        this.z = ++CardComponent.top;
        this.render();
    }
    take() {
        this.goFront();
        this.htmlElement.classList.add("card-take");
    }
    drop() {
        this.htmlElement.classList.remove("card-take");
    }
    stack() {
        this.setVisible(false);
        this.render();
    }
    unstack(x, y) {
        this.goFront();
        this.move(x - CardComponent.WIDTH / 2, y - CardComponent.HEIGHT / 2);
        this.setVisible(true);
        this.render();
    }
    render() {
        super.render();
        let x = (this.x + CardComponent.WIDTH / 2 <= 0) ? -CardComponent.WIDTH / 2 : (this.x + CardComponent.WIDTH / 2 >= window.innerWidth) ? window.innerWidth - CardComponent.WIDTH / 2 : this.x;
        let y = (this.y + CardComponent.HEIGHT / 2 <= 0) ? -CardComponent.HEIGHT / 2 : (this.y + CardComponent.HEIGHT / 2 >= window.innerHeight) ? window.innerHeight - CardComponent.HEIGHT / 2 : this.y;
        this.htmlElement.style.top = y + "px";
        this.htmlElement.style.left = x + "px";
        this.htmlElement.style.zIndex = "" + this.z;
    }
    getCard() {
        return this.card;
    }
    getSave() {
        const json = {};
        json.color = this.card.getColor();
        json.value = this.card.getValue();
        json.x = this.x;
        json.y = this.y;
        return json;
    }
}
CardComponent.WIDTH = 196;
CardComponent.HEIGHT = 300;
CardComponent.top = 1;
