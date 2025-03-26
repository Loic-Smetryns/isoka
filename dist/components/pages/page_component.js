"use strict";
class PageComponent extends HTMLComponent {
    constructor(id, container, pageManager, cardManager) {
        let htmlElement = document.createElement("div");
        htmlElement.classList.add("page");
        htmlElement.id = id;
        super(container, htmlElement);
        this.pageManager = pageManager;
        this.cardManager = cardManager;
        this.setVisible(false);
        this.render();
    }
}
