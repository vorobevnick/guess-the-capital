'use strict';

import ajaxService from './ajaxService.js';

class BlockGameController {
    constructor(options) {
        this._countries = [];

        this._countSymbol = options.countSymbol;
        this._scoreRound = options.scoreRound;
        this._totalScore = options.totalScore;

        this._tempCapital = '';

        this._arrayLetters = ['а','б','в','г','д','е','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ы','э','ю','я'];

        this._loadCountry();

        this._startGame();

        document.querySelector('[data-element="letters"]').addEventListener('click', this._checkLetter.bind(this));
        document.querySelector('[data-element="button"]').addEventListener('click', this._renderPage.bind(this ));
    }

    _startGame() {
        document.querySelector('[data-element="totalScore"]').innerHTML = this._totalScore;

        document.onmousedown = function() {
            return false;
        };

    }

    _loadCountry() {
        let url = '/data/country.json';

        ajaxService.loadJson(url)
            .then(this._generateLevel.bind(this))
            .catch(this._onError.bind(this))
    }

    _onError(error) {
        console.error(error);
    }

    _generateLevel(countries) {
        let tempCountry = [];

        countries.forEach(function (item) {
            tempCountry.push(item);
        });

        this._shuffle(tempCountry);

        this._countries = tempCountry;

    }

    _renderPage() {
        document.querySelector('[data-element="score"]').classList.remove('js-hidden');
        let item = this._countries.shift();

        this._scoreRound = 5;

        document.querySelector('[data-element="scoreRound"]').innerHTML = this._scoreRound;

        if (!this._countries.length) {
            this._endGame();
        }

        document.querySelector('[data-element="header"]').innerHTML = item.country;
        document.querySelector('[data-element="image"]').src = item.imageUrl;

        this._renderLetters(item.capital);

        document.querySelector('[data-element="button"]').setAttribute('value', 'Продолжить');
        document.querySelector('[data-element="button"]').setAttribute('disabled', 'true');

        this._tempCapital = item.capital;

    }

    _renderLetters(capital) {
        this._captial = capital;

        let shuffleLetters = [];

        let letters = document.querySelector('[data-element="letters"]');
        let answer = document.querySelector('[data-element="answer"]');

        this._removeChild(letters);
        this._removeChild(answer);

        for (let i = 0; i < this._captial.length; i++) {

            let span = document.createElement('span');
            let char = document.createTextNode(this._captial.charAt(i));
            let divAnswer = document.createElement('div');

            span.classList.add('letter');
            span.setAttribute('data-letters', "");
            divAnswer.classList.add('divAnswer');
            divAnswer.setAttribute('data-element', "letterAnswer");

            span.appendChild(char);

            answer.appendChild(divAnswer);
            letters.appendChild(span);

        }

        for (let i = this._captial.length; i < this._countSymbol; i++) {
            let span = document.createElement('span');
            let char = document.createTextNode(this._arrayLetters[Math.floor(Math.random()*30)]);

            span.classList.add('letter');

            span.appendChild(char);
            span.setAttribute('data-letters', "");
            letters.appendChild(span);
        }

        let last = letters.querySelectorAll('span');

        [].forEach.call(last, function (item) {
            shuffleLetters.push(item);
        });

        this._shuffle(shuffleLetters);

        shuffleLetters.forEach(function (item) {
            letters.appendChild(item);
        });

    }

    _checkLetter(event) {
        let symbol = event.target.closest('[data-letters=""]');
        let divAnswer = document.querySelector('[data-element="letterAnswer"]');

        if(!symbol) return;

        if (this._tempCapital.charAt(0).toLocaleLowerCase() === event.target.firstChild.data.toLowerCase()) {
            let answerLetter = document.createTextNode(this._tempCapital.charAt(0).toUpperCase());
            divAnswer.appendChild(answerLetter);
            divAnswer.classList.add('success');
            divAnswer.removeAttribute('data-element');

            this._tempCapital = this._tempCapital.substr(1, this._tempCapital.length);

            event.target.classList.add('js-hidden');

        } else {
            event.target.classList.add('error');
            setTimeout(function() {
                event.target.classList.remove('error');
            }, 100);

            if (this._scoreRound > 0) {
                this._scoreRound--;
            }
            document.querySelector('[data-element="scoreRound"]').innerHTML = this._scoreRound;

        }

        if(!this._tempCapital.length) {
            this._totalScore += this._scoreRound;

            this._scoreRound = 0;
            document.querySelector('[data-element="scoreRound"]').innerHTML = '';

            document.querySelector('[data-element="totalScore"]').innerHTML = this._totalScore;
            document.querySelector('[data-element="button"]').removeAttribute('disabled');
        }

    };


    _removeChild(element) {
        if(element.children.length) {
            while (element.children.length) {
                element.removeChild(element.lastChild);
            }
        }
    }

    _shuffle(item) {
        for (let i = 0; i < item.length - 1; i++) {

            let rand = Math.floor(Math.random() * (i + 1));

            let tmp = item[rand];
            item[rand] = item[i];
            item[i] = tmp;
        }

        return item;
    }

    _endGame() {
        document.querySelector('[data-component="block-game"]').innerHTML = '<h1>Поздравляем!</h1> вы набралаи ' + this._totalScore +' очков!';
    }

} // end class

module.exports = BlockGameController;