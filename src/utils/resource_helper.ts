class ResourceHelper{
    public static getUrl(card: Card) : string{
        return `url("./assets/cards/${card.getValue()}${card.getColor()}.png")`;
    }
}