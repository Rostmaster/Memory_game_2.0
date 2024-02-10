import { Card } from "./Card.js";

class CardMatch {

    scales = {
        1: { width: 4, heigh: 3, cardsAmount: 12 },
        2: { width: 6, heigh: 4, cardsAmount: 24 },
        3: { width: 6, heigh: 6, cardsAmount: 36 },
        4: { width: 8, heigh: 6, cardsAmount: 48 },
    }

    difficulties = {
        0: { timePerPair: Infinity, possibleErrors: infinity },
        1: { timePerPair: 10000, possibleErrors: 10 },
        2: { timePerPair: 5000, possibleErrors: 5 },
        3: { timePerPair: 3000, possibleErrors: 3 },
        4: { timePerPair: 2000, possibleErrors: 2 },
        5: { timePerPair: 1000, possibleErrors: 1 },
        6: { timePerPair: 500, possibleErrors: 1 },

    }

    constructor(scale = 2, difficulty = 0) {
        this.scale = scale
        this.deckSize = scales[scale].cardsAmount
        this.pairsToFind = this.deckSize / 2
        this.errors = 0
        this.maxErrors = difficulties[difficulty].possibleErrors
        this.time = difficulties[difficulty].timePerPair * this.deckSize / 2
        this.cards = deckIinit(this.deckSize)
        this.selection1 = null
        this.selection2 = null
    }

    deckIinit = (size) => {
        let cards = []
        for (let i = 0; i < size / 2; i++) {
            cards.push(new Card(i))
            cards.push(new Card(i))
        }
        return cards
    }

    select = (cardId) => {
        if (typeof cardId !== "number") return false
        if (cardId < 0 && cardId > this.deckSize - 1) this.displayMessage("Invalid Card Id")
        if (this.cards[cardId].isSelected() || this.cards[cardId].isMatched()) this.displayMessage("Card already selected or matched")

        if (this.selection1 === null) {
            this.cards[cardId].select()
            this.selection1 = cardId
            return true
        }
        if (this.selection2 === null) {
            this.cards[cardId].select()
            this.selection2 = cardId
            return true
        }

        return false
    }

    checkMatch = () => {
        if (this.selection1 === null || this.selection2 === null) return false
        if (this.cards[this.selection1].id === this.cards[this.selection2].id) {
            this.cards[this.selection1].match()
            this.cards[this.selection2].match()
            this.selection1 = null
            this.selection2 = null
            return true
        }
    }

    displayMessage = (message) => alert(message)
}