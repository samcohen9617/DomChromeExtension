

export const startsWithAction = (subject, user, tempDeck) => {
    subject.forEach((item) => {
        const countCardPair = item.split(' ');
        if (countCardPair[0] === 'a') {
            countCardPair[0] = 1;
        } else {
            countCardPair[1] =
                countCardPair[1][-1] == 's'
                    ? countCardPair[1].slice(0, -1)
                    : countCardPair[1];
        }
        tempDeck[user].deck[countCardPair[1]] = Number(countCardPair[0]);
        tempDeck[user].discard[countCardPair[1]] = Number(countCardPair[0]);
    });
    return tempDeck;
};

export const playsAction = (subject, user, tempDeck) => {
    subject.forEach((item) => {
        const countCardPair = item.split(' ');
        if (countCardPair[0] === 'a') {
            countCardPair[0] = 1;
        } else {
            countCardPair[1] =
                countCardPair[1][-1] == 's'
                    ? countCardPair[1].slice(0, -1)
                    : countCardPair[1];
        }
        tempDeck[user].inPlay[countCardPair[1]] = Number(countCardPair[0]);
        tempDeck[user].drawPile[countCardPair[1]] -= Number(countCardPair[0]);
    });
    return tempDeck;
};
