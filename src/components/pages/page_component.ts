abstract class PageComponent extends HTMLComponent {
    protected pageManager : PageManager;
    protected cardManager : CardManager;

    constructor(id: string, container: HTMLElement, pageManager: PageManager, cardManager: CardManager){
        let htmlElement = document.createElement("div");

        htmlElement.classList.add("page");
        htmlElement.id = id;

        super(container, htmlElement);

        this.pageManager = pageManager;
        this.cardManager = cardManager;
        
        this.setVisible(false)
        this.render();
    }
}