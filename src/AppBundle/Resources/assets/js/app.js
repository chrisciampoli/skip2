require('core-js');

window.$ = window.jQuery = require("jquery");
window.URI = require("URIjs");
window.bootstrap = require('bootstrap');
window.Holder = require('holderjs');
window.Pace = require('pace');

window.location.uri = URI(window.location.href);
window.location.queryDict = window.location.uri.search(true);
window.location.getQuery = function(val, defaultVal) {
    if (void 0 === window.location.queryDict[val]) {
        return defaultVal;
    }
    return window.location.queryDict[val];
};

Object.size = function (obj) {
    var key, size = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;
        }
    }

    return size;
};

window.ltrim = function(str, charlist) {
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
    var re = new RegExp('^[' + charlist + ']+', 'g');
    return (str + '')
        .replace(re, '');
};

window.rtrim = function(str, charlist) {
    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
    var re = new RegExp('[' + charlist + ']+$', 'g');
    return (str + '')
        .replace(re, '');
};

window.trim = function(str, charlist) {
    return ltrim(rtrim(str, charlist), charlist);
};

window.ucwords = function(str) {
    return (str + '')
        .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
            return $1.toUpperCase();
        });
};

Array.prototype.indexOfId = function(id) {
    var i, j, ref;
    for (i = j = 0, ref = this.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        if (this[i].id === id) {
            return i;
        }
    }
    return false;
};

Array.prototype.removeById = function(id) {
    var index;
    index = this.indexOfId(id);
    if (index === false) {
        return false;
    }
    return this.splice(index, 1);
};

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

const Skip = require("./Skip");

var env = $('meta[name=environment]').length > 0 ? $('meta[name=environment]').attr('content') : 'prod';
window.skip = new Skip(env, window.user);
skip.run();
