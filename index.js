const config = require('./config/configSite');
const logger = require('./lib/logger');
const { collectRankFromMelon } = require('./lib/melon');
const { collectRankFromGenie } = require('./lib/genie');
const { collectRankFromBugs } = require('./lib/bugs');

const siteNames = process.argv.splice(2 , process.argv.length);

const rankCrawler = async (siteNames) => {
    console.log(siteNames);
    if (!siteNames || siteNames.length === 0) {
        console.error("Please enter. site name.");
        return;
    }
    try {
        console.log('enter!!');
        await siteNames.forEach((site) => {
           if (site === 'melon') {
               collectRankFromMelon(config[site].url, config[site].query)
                   .then(result => logger.debug(result));
           } else if (site == 'genie') {
               collectRankFromGenie(config[site].url, config[site].query)
                   .then((result) => logger.debug(result));
           } else if (site == 'bugs') {
               collectRankFromBugs(config[site].url, config[site].query)
                   .then(result => logger.debug(result));
           } else {
               console.error("syntax error: Unavailable Sites.");
           }
        });
    } catch (err) {
        console.error(err);
    }
}

rankCrawler(siteNames);