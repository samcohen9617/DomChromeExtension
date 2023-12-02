const getNumberOfCards = (subject) => {
    const rawCount = subject.split(' ')[0];
    if (/^[0-9]*$/.test(rawCount)) {
        return Number(rawCount);
    }
    return 1;
};

const parseSubject = (subject) => {
    const subjectDict = {};
    subject.forEach((subjectItem) => {
        const count = getNumberOfCards(subjectItem);
        // subject item from index 1 to end
        const card = subjectItem.split(' ').slice(1).join(' ');
        subjectDict[card] = count;
    });
    return subjectDict;
};

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
    console.log('====> playsAction', parseSubject(subject));
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
