export class Card{
    constructor(index){
        this.matched = false
        this.selected = false
        this.id = index

        alert(index)
    }

    isSelected = () => this.selected
    isMatched = () => this.matched
    id = () => this.id

    select = () => this.selected = true
    unselect = () => this.selected = false

    match = () => this.matched = true
    unmatch = () => this.matched = false
}

