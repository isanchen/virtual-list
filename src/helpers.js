import { loremIpsum } from "lorem-ipsum";

function generateRandomText() {
    return loremIpsum({
        count: 2,
        random: Math.random,
        units: 'sentences',
        sentenceLowerBound: 10,
        sentenceUpperBound: 100
    });
}
export function gererateItemsFromText(count) {
    if (count - 0 === parseInt(count)) {
        const list = Array(parseInt(count));
        if (list.length > 6000) {
            alert("Uh oh, that's beyond the limit of the current implementation unfortunately, now safely creating 1000 for you instead.");
            list.length = 1000;
        }
        for (let index = 0; index < list.length; index++) {
            list[index] = generateRandomText();
        }
        return list;
    }
    else {
        return [generateRandomText()];
    }
}