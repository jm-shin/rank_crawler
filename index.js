const { collectRankFromMelon } = require('./src/melon');
const { collectRankFromGenie } = require('./src/genie');
const { collectRankFromBugs } = require('./src/bugs');
const config = require('./config/configSite');

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
               collectRankFromMelon(config[site].url, config[site].query);
           } else if (site == 'genie') {
               collectRankFromGenie(config[site].url, config[site].query)
                   .then((result) => console.log(result));
           } else if (site == 'bugs') {
               collectRankFromBugs(config[site].url, config[site].query)
                   .then(result => console.log(result))
           } else {
               console.error("syntax error: Unavailable Sites.");
           }
        });
    } catch (err) {
        console.error(err);
    }
}

rankCrawler(siteNames);