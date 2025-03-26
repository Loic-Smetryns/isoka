"use strict";
class StackComponent extends HTMLComponent {
    constructor(container, htmlElement, playgroundPage, cardManager) {
        super(container, htmlElement);
        this.flownHover = false;
        this.open = true;
        this.playgroundPage = playgroundPage;
        this.cardManager = cardManager;
    }
    isOpen() {
        return this.open;
    }
    setOpen(open) {
        this.open = open;
    }
    updateFlownHover(x, y) {
        const flownHover = !this.open ? false : (this.playgroundPage.getSelected() !== null && this.isHover(x, y));
        if (this.flownHover != flownHover) {
            this.flownHover = flownHover;
            this.render();
        }
    }
    render() {
        super.render();
        this.htmlElement.classList.remove("empty");
        this.htmlElement.classList.remove("not-empty");
        this.htmlElement.classList.remove("flown-hover");
        if (this.flownHover)
            this.htmlElement.classList.add("flown-hover");
    }
}
