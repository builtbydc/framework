function createCards() {
    let out = "";
    for(let i = 0; i < allCards.length; i++) {
        out += allCards[i].create();
    }
    return out;
}

function Structure() {
    initCards();
    return build([
        createCards()
    ]);
}