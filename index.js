const config = require('./config/configSite');
const logger = require('./lib/logger');
const { collectRankFromMelon } = require('./lib/melon');
const { collectRankFromGenie } = require('./lib/genie');
const { collectRankFromBugs } = require('./lib/bugs');
const { saveFileAsCSV } = require('./lib/saveFile');

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
                       logger.debug(`${site}: ${JSON.stringify(rankList)}`);
                       saveFileAsCSV(rankList, site);
                   })
                   .catch((err) => console.error(err));
           } else if (site === 'genie') {
               logger.info('genie start!');
               collectRankFromGenie(config[site].url, config[site].query)
                   .then((rankList) => {
                       logger.debug(`${site}: ${JSON.stringify(rankList)}`);
                       saveFileAsCSV(rankList, site);
                   })
                   .catch((err) => console.error(err));
           } else if (site === 'bugs') {
               logger.info('bugs start!');
               collectRankFromBugs(config[site].url, config[site].query)
                   .then((rankList) => {
                       logger.debug(`${site}: ${JSON.stringify(rankList)}`);
                       saveFileAsCSV(rankList, site);
                   })
                   .catch(err => console.error(err));
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