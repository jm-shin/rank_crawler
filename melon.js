const axios = require('axios');
const cheerio = require('cheerio');

const melon = async (url, scrap) => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            let scrapKeys = [];
            let scrapValues = [];
            for (const [key, value] of Object.entries(scrap)){
                scrapKeys.push(key);
                scrapValues.push(value);
            }
            const html = response.data;
            const $ = cheerio.load(html);

            //제목, 가수, 앪범
            const scraping = await Promise.all(
                scrapValues.map((target, index) => {
                    const html = $(target);
                    let result = [];
                    html.each((idx, el) => {
                        result.push($(el).find('div a:eq(0)').text());
                    })
                    return result;
                })
            );

            const names = scraping[0];
            const singers = scraping[1];
            const albums = scraping[2];

            const rankArray = await names.reduce((acc, cur, i) => {
               const data = {
                   name: cur,
                   singer: singers[i],
                   album: albums[i]
               }
               acc.push(data);
               return acc;
            }, []);
            return rankArray;
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = melon;