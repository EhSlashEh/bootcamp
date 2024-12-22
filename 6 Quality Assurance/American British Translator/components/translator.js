const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
    americanToBritish(text) {
        const wordDiffAndSpelling = { ...americanOnly, ...americanToBritishSpelling };
        const titles = americanToBritishTitles;

        return this.translat(text, wordDiffAndSpelling, titles);
    }

    britishToAmerican(text) {
        const britishToAmericanSpelling = this.objectFlip(americanToBritishSpelling);
        const wordDiffAndSpelling = { ...britishOnly, ...britishToAmericanSpelling };
        const britishToAmericanTitles = this.objectFlip(americanToBritishTitles);

        return this.translat(text, wordDiffAndSpelling, britishToAmericanTitles);
    }

    translat(text, wordDiffAndSpelling, titles) {
        const textLowerCase = text.toLowerCase();
        let translated;
        const timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g;

        Object.entries(titles)
            .map(([key, value]) => {
                if (textLowerCase.includes(key)) {
                    translated = text.replace(new RegExp(key, "gi"), `<span class="highlight">${this.capitalizeFirstLetter(value)}</span>`) || text;
                }
            });

        translated = translated || text;

        const changeTime = textLowerCase.match(timeRegex); 
        if (changeTime) {
            changeTime.map(time => {
                translated = translated.replace(time, `<span class="highlight">${time.replace(':', '.')}</span>`) || text;
            });
        }

        Object.entries(wordDiffAndSpelling)
            .map(([key, value]) => {
                if (new RegExp(`${key} `, "gi").test(textLowerCase) ||
                    new RegExp(`${key}[^A-Za-z]`, "gi").test(textLowerCase) ||
                    new RegExp(`${key}$`, "gi").test(textLowerCase)) {

                    translated = translated.replace(new RegExp(key, "gi"), `<span class="highlight">${value}</span>`) || text;
                }
            });

        return translated || text;
    }

    objectFlip(obj) {
        return Object.entries(obj).reduce((acc, [key, value]) => (acc[value] = key, acc), {});
    }

    capitalizeFirstLetter(word) {
        return word[0].toUpperCase() + word.slice(1);
    }
}

module.exports = Translator;
