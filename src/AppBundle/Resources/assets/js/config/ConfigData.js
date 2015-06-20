class ConfigData {
    constructor(Skip) {
        this.Skip = Skip;
    }

    getData() {
        return {
            placeholders: {
                enabled: false
            },
            rotator:      {
                interval:  750,
                fadeDelay: 250
            },
            api:          {
                url: this.Skip.isEnv('prod') ? 'http://www.potions.space' : 'http://www.potions.space.dev'
            }
        }
    }
}

module.exports = ConfigData;
