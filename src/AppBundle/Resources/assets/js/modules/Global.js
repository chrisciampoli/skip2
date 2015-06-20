const React = require('react');
const store = require('store');
const Pace  = window.Pace;

module.exports = () => {
    $(document).ajaxStart(function() {
        return Pace.restart();
    });

    $(function() {
        var tags;
        $('body').show();
        $('.slim-scroll').each(function() {
            var item;
            item = $(this);
            return item.slimScroll({
                height: item.data('height') || 100,
                railVisible: true
            });
        });

    });

    window.ucwords = function(str) {
        if (str === null) {
            return "";
        }
        return str.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function($1) {
            return $1.toUpperCase();
        });
    };

    window.upperFirst = function(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    }

    $.fn.serializeObject = window.serializeObject = function() {
        var a, o;
        o = {};
        a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                return o[this.name].push(this.value || "");
            } else {
                return o[this.name] = this.value || "";
            }
        });
        return o;
    };

    History.getPageUrl = function() {
        var State, pageUrl, stateUrl;
        State = History.getState(false, false);
        stateUrl = (State || {}).url || History.getLocationHref();
        pageUrl = void 0;
        pageUrl = stateUrl.replace(/\/+$/, '').replace(/[^\/]+$/, function(part, index, string) {
            if (/\./.test(part)) {
                return part;
            } else {
                return part + '/';
            }
        });
        if (pageUrl.substr(pageUrl.length - 1, 1) === '/') {
            pageUrl = pageUrl.substr(0, pageUrl.length - 1);
        }
        return pageUrl;
    };
};
