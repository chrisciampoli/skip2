import Classes from '../Classes';

class ExternalData {
    constructor(Skip) {
        this.Skip = Skip;
        this.data = window.externalData;
    }

    getData() {
        var API = this.Skip.container.get('api');

        for (var key in this.data) {
            if (!this.data.hasOwnProperty(key)) {
                continue;
            }
            var item = this.data[key];

            this.data[key] = typeof item === 'function' ? item(Classes) : item;
        }

        return $.extend({}, this.data, {

        });
    }
}

module.exports = ExternalData;
