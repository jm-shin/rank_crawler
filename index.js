const config = require('./config/configSite');
const logger = require('./lib/logger');
const { collectRankFromMelon } = require('./lib/melon');
const { collectRankFromGenie } = require('./lib/genie');
const { collectRankFromBugs } = require('./lib/bugs');

const siteNames = process.argv.splice(2 , process.argv.length);

const rankCrawler = async (siteNames) => {
    if (!siteNames || siteNames.length === 0) {
        console.error("Please enter. site name.");
        return;
    }
    try {
        logger.info(`start ${siteNames} site scraping.`);
        await siteNames.forEach((site) => {
           if (site === 'melon') {
               logger.info('melon start!');
               collectRankFromMelon(config[site].url, config[site].query)
                   .then((rankList) => {
                       logger.debug('melon' + JSON.stringify(rankList));
                       console.log(`melon: ${JSON.stringify(rankList)}`);
                   });
           } else if (site == 'genie') {
               logger.info('genie start!');
               collectRankFromGenie(config[site].url, config[site].query)
                   .then((rankList) => {
                       logger.debug('genie:' + JSON.stringify(rankList));
                       console.log(`genie: ${JSON.stringify(rankList)}`);
                   });
           } else if (site == 'bugs') {
               logger.info('bugs start!');
               collectRankFromBugs(config[site].url, config[site].query)
                   .then((rankList) => {
                       logger.debug('bugs: ' + JSON.stringify(rankList));
                       console.log(`bugs: ${JSON.stringify(rankList)}`);
                   });
           } else {
               console.error("syntax error: Unavailable Sites.");
               logger.error(`[index.js] syntax error: Unavailable Sites.`);
           }
        });
        logger.info('scraping done.');
    } catch (err) {
        console.error(err);
    }
}

rankCrawler(siteNames).catch((err) => console.error(err));