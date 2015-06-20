const React = require("react");
const ReactDI = require("react-di");

import Router from "./Router";

class Config {
    constructor(_data) {
        this._data = _data;
    }

    all() {
        return this._data;
    }

    get(item, defaultVal = undefined) {
        var configs = this._data,
            temp;

        while (item.indexOf('.') !== -1) {
            temp = item.split(/\.(.+)?/);
            configs = configs[temp[0]];
            item = temp[1];
        }

        return undefined !== configs[item] ? configs[item] : defaultVal;
    }
}

class Data {
    constructor(_data) {
        var item;
        this._data = _data;
        for (item in this._data) {
            if (!this._data.hasOwnProperty(item)) {
                continue;
            }

            var result = this.get(item);
            if (typeof item === 'function') {
                result();
            }
        }
    }

    all() {
        return this._data;
    }

    get(item) {
        return this._data[item];
    }

    set(item, value) {
        return this._data[item] = value;
    }

    finished() {
        var item, type;
        for (item in this._data) {
            if (!this._data.hasOwnProperty(item)) {
                continue;
            }

            type = typeof this.get(item);
            if (type === 'function') {
                return false;
            }
        }

        return true;
    }
}

class API {
    constructor(url) {
        this.url = url;
    }

    call(url, callback) {
        return $.get("" + (this.url) + url, callback);
    }
}

class Authentication {
    constructor(user) {
        this.user = user;
    }

    isLoggedIn() {
        return this.user != null;
    }

    getUser() {
        return this.user;
    }
}

class Container extends ReactDI {
    constructor(Skip) {
        super({
            auth: new Authentication(Skip.getUser()),

            env:  Skip.getEnvironment(),

            dispatcher: new (require("flux")).Dispatcher(),

            router: new Router(require('./routes')),

            api: (() => {
                if (Skip.config.get('api.url', void 0) === void 0) {
                    throw new Error("Config not set yet.");
                }

                return new API(Skip.config.get('api.url'));
            })(Skip)
        });

        this.inject(React);
    }
}

class Repository {
    constructor() {
        this.items = {};
    }

    add(name, item) {
        this.items[name] = item;
    }

    fetch(name) {
        if (typeof this.items[name] === "undefined") {
            return () => console.log(`${name} is not a valid item.`);
        }

        return this.items[name];
    }

    all() {
        return this.items
    }
}

module.exports = {
    API: API,
    Authentication: Authentication,
    Config: Config,
    Container: Container,
    Data: Data,
    Repository: Repository
};
