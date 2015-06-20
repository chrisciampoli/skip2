class Router {
    constructor(data) {
        this.context = {};
        this.routes = {};

        this.setData(data);
    }

    setRoutes(routes) {
        this.routes = routes;
    }

    setData(data) {
        this.setBaseUrl(data.base_url);
        this.setRoutes(data.routes);
        this.setPrefix(data.prefix);
        this.setHost(data.host);
        this.setScheme(data.scheme);
    }

    getRoutes() {
        return this.routes;
    }

    setBaseUrl(base_url) {
        this.context.base_url = base_url;
    }

    getBaseUrl() {
        return this.context.base_url;
    }

    setPrefix(prefix) {
        this.context.prefix = prefix;
    }

    getPrefix() {
        return this.context.prefix;
    }

    setScheme(scheme) {
        this.context.scheme = scheme;
    }

    getScheme() {
        return this.context.scheme;
    }

    setHost(host) {
        this.context.host = host;
    }

    getHost() {
        return this.context.host;
    }

    /**
     * Builds query string params added to a URL.
     * Port of jQuery's $.param() function, so credit is due there.
     *
     * @param {string} prefix
     * @param {Array|Object|string} params
     * @param {Function} add
     */
    buildQueryParams(prefix, params, add) {
        var self = this;
        var name;
        var rbracket = new RegExp(/\[\]$/);

        if (params instanceof Array) {
            $.each(params, function(i, val) {
                if (rbracket.test(prefix)) {
                    add(prefix, val);
                } else {
                    self.buildQueryParams(prefix + '[' + (typeof val === 'object' ? i : '') + ']', val, add);
                }
            });
        } else if (typeof params === 'object') {
            for (name in params) {
                this.buildQueryParams(prefix + '[' + name + ']', params[name], add);
            }
        } else {
            add(prefix, params);
        }
    }

    /**
     * Returns a raw route object.
     *
     * @param {string} name
     * @return {fos.Router.Route}
     */
    getRoute(name) {
        var prefixedName = this.getPrefix() + name;
        if (this.routes[prefixedName] === undefined) {
            // Check first for default route before failing
            if (this.routes[name] === undefined) {
                throw new Error('The route "' + name + '" does not exist.');
            }
        } else {
            name = prefixedName;
        }

        return (this.routes[name]);
    }

    /**
     * Generates the URL for a route.
     *
     * @param {string} name
     * @param {Object.<string, string>} opt_params
     * @param {boolean} absolute
     * @return {string}
     */
    generate(name, params, absolute) {
        var route = (this.getRoute(name)),
            params = params || {},
            unusedParams = jQuery.extend(true, {}, params),
            url = '',
            optional = true,
            host = '';

        $.each(route.tokens, function(i, token) {
            if ('text' === token[0]) {
                url = token[1] + url;
                optional = false;

                return;
            }

            if ('variable' === token[0]) {
                var hasDefault = route.defaults[token[3]] !== undefined;
                if (false === optional || !hasDefault || (params[token[3]] !== undefined && params[token[3]] != route.defaults[token[3]])) {
                    var value;

                    if (params[token[3]] !== undefined) {
                        value = params[token[3]];
                        delete unusedParams[token[3]];
                    } else if (hasDefault) {
                        value = route.defaults[token[3]];
                    } else if (optional) {
                        return;
                    } else {
                        throw new Error('The route "' + name + '" requires the parameter "' + token[3] + '".');
                    }

                    var empty = true === value || false === value || '' === value;

                    if (!empty || !optional) {
                        var encodedValue = encodeURIComponent(value).replace(/%2F/g, '/');

                        if ('null' === encodedValue && null === value) {
                            encodedValue = '';
                        }

                        url = token[1] + encodedValue + url;
                    }

                    optional = false;
                } else if (hasDefault) {
                    delete unusedParams[token[3]];
                }

                return;
            }

            throw new Error('The token type "' + token[0] + '" is not supported.');
        });

        if (url === '') {
            url = '/';
        }

        $.each(route.hosttokens, function (i, token) {
            var value;

            if ('text' === token[0]) {
                host = token[1] + host;

                return;
            }

            if ('variable' === token[0]) {
                if (params[token[3]] !== undefined) {
                    value = params[token[3]];
                    delete unusedParams[token[3]];
                } else if (route.defaults[token[3]] !== undefined) {
                    value = route.defaults[token[3]];
                }

                host = token[1] + value + host;
            }
        });

        url = this.getBaseUrl() + url;
        if (route.requirements["_scheme"] !== undefined && this.getScheme() != route.requirements["_scheme"]) {
            url = route.requirements["_scheme"] + "://" + (host || this.getHost()) + url;
        } else if (host && this.getHost() !== host) {
            url = this.getScheme() + "://" + host + url;
        } else if (absolute === true) {
            url = this.getScheme() + "://" + this.getHost() + url;
        }

        if (Object.size(unusedParams) > 0) {
            var prefix;
            var queryParams = [];
            var add = function(key, value) {
                // if value is a function then call it and assign it's return value as value
                value = (typeof value === 'function') ? value() : value;

                // change null to empty string
                value = (value === null) ? '' : value;

                queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            };

            for (prefix in unusedParams) {
                this.buildQueryParams(prefix, unusedParams[prefix], add);
            }

            url = url + '?' + queryParams.join('&').replace(/%20/g, '+');
        }

        return url;
    }
}

module.exports = Router;
