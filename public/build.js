!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";e.exports={loadJson:function(e,t){t=t||{};var r=new XMLHttpRequest,n=t.method||"GET";return r.open(n,e,!0),new Promise(function(e,t){r.onload=function(){200===r.status?e(JSON.parse(r.responseText)):t()},r.onerror=function(){t()},r.send()}).catch(function(){var e=new Error(r.status+": "+r.statusText);throw console.error("Ajax error",e),e})}}},function(e,t,r){"use strict";var n,o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=r(0),i=(n=a)&&n.__esModule?n:{default:n};var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._countries=[],this._countSymbol=t.countSymbol,this._scoreRound=t.scoreRound,this._totalScore=t.totalScore,this._tempCapital="",this._arrayLetters=["а","б","в","г","д","е","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ы","э","ю","я"],this._loadCountry(),this._startGame(),document.querySelector('[data-element="letters"]').addEventListener("click",this._checkLetter.bind(this)),document.querySelector('[data-element="button"]').addEventListener("click",this._renderPage.bind(this))}return o(e,[{key:"_startGame",value:function(){document.querySelector('[data-element="totalScore"]').innerHTML=this._totalScore,document.onmousedown=function(){return!1}}},{key:"_loadCountry",value:function(){i.default.loadJson("/data/country.json").then(this._generateLevel.bind(this)).catch(this._onError.bind(this))}},{key:"_onError",value:function(e){console.error(e)}},{key:"_generateLevel",value:function(e){var t=[];e.forEach(function(e){t.push(e)}),this._shuffle(t),this._countries=t}},{key:"_renderPage",value:function(){document.querySelector('[data-element="score"]').classList.remove("js-hidden");var e=this._countries.shift();this._scoreRound=5,document.querySelector('[data-element="scoreRound"]').innerHTML=this._scoreRound,this._countries.length||this._endGame(),document.querySelector('[data-element="header"]').innerHTML=e.country,document.querySelector('[data-element="image"]').src=e.imageUrl,this._renderLetters(e.capital),document.querySelector('[data-element="button"]').setAttribute("value","Продолжить"),document.querySelector('[data-element="button"]').setAttribute("disabled","true"),this._tempCapital=e.capital}},{key:"_renderLetters",value:function(e){this._captial=e;var t=[],r=document.querySelector('[data-element="letters"]'),n=document.querySelector('[data-element="answer"]');this._removeChild(r),this._removeChild(n);for(var o=0;o<this._captial.length;o++){var a=document.createElement("span"),i=document.createTextNode(this._captial.charAt(o)),u=document.createElement("div");a.classList.add("letter"),a.setAttribute("data-letters",""),u.classList.add("divAnswer"),u.setAttribute("data-element","letterAnswer"),a.appendChild(i),n.appendChild(u),r.appendChild(a)}for(var s=this._captial.length;s<this._countSymbol;s++){var c=document.createElement("span"),l=document.createTextNode(this._arrayLetters[Math.floor(30*Math.random())]);c.classList.add("letter"),c.appendChild(l),c.setAttribute("data-letters",""),r.appendChild(c)}var d=r.querySelectorAll("span");[].forEach.call(d,function(e){t.push(e)}),this._shuffle(t),t.forEach(function(e){r.appendChild(e)})}},{key:"_checkLetter",value:function(e){var t=e.target.closest('[data-letters=""]'),r=document.querySelector('[data-element="letterAnswer"]');if(t){if(this._tempCapital.charAt(0).toLocaleLowerCase()===e.target.firstChild.data.toLowerCase()){var n=document.createTextNode(this._tempCapital.charAt(0).toUpperCase());r.appendChild(n),r.classList.add("success"),r.removeAttribute("data-element"),this._tempCapital=this._tempCapital.substr(1,this._tempCapital.length),e.target.classList.add("js-hidden")}else e.target.classList.add("error"),setTimeout(function(){e.target.classList.remove("error")},100),this._scoreRound>0&&this._scoreRound--,document.querySelector('[data-element="scoreRound"]').innerHTML=this._scoreRound;this._tempCapital.length||(this._totalScore+=this._scoreRound,this._scoreRound=0,document.querySelector('[data-element="scoreRound"]').innerHTML="",document.querySelector('[data-element="totalScore"]').innerHTML=this._totalScore,document.querySelector('[data-element="button"]').removeAttribute("disabled"))}}},{key:"_removeChild",value:function(e){if(e.children.length)for(;e.children.length;)e.removeChild(e.lastChild)}},{key:"_shuffle",value:function(e){for(var t=0;t<e.length-1;t++){var r=Math.floor(Math.random()*(t+1)),n=e[r];e[r]=e[t],e[t]=n}return e}},{key:"_endGame",value:function(){document.querySelector('[data-component="block-game"]').innerHTML="<h1>Поздравляем!</h1> вы набралаи "+this._totalScore+" очков!"}}]),e}();e.exports=u},function(e,t,r){"use strict";var n,o=r(1);new((n=o)&&n.__esModule?n:{default:n}).default({countSymbol:20,scoreRound:5,totalScore:0})}]);