class Card{
    private static currentId: number = Math.floor((Math.random()*1000000000));

    private id: number;
    private color: CardColor;
    private value: CardValue;

    public constructor(color: CardColor, value: CardValue){
        this.color = color;
        this.value = value;
        this.id = Card.currentId++;
    }

    public getColor() : CardColor {
        return this.color;
    }

    public getValue() : CardValue {
        return this.value;
    }

    public getId() : number{
        return this.id;
    }
}