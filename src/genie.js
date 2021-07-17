const axios = require('axios');
const cheerio = require('cheerio');

const collectRankFromGenie = async (url, scrap) => {
    try {
        const RANK = 50;
        const response = await axios.get(url);
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);

            //제목
            const namesHTML = $("a.title.ellipsis");
            //const namesHTML = $('a.title.ellipsis').text();
            let names = [];
            await namesHTML.each( (idx, name) => {
                names.push($(name).text().trim());
            });

            //가수
            const singersHTML = $("a.artist.ellipsis");
            let singers = [];
            await singersHTML.each( (idx, singer) => {
                singers.push($(singer).text().trim());
            });
            singers.splice(0,5);

            //앨범
            const albumHTML = $("a.albumtitle.ellipsis");
            let albums = [];
            await albumHTML.each( (idx, album) => {
                albums.push($(album).text().trim());
            });

            let rankArray = [];
            for (let i = 0; i < RANK; i++) {
                const row = {
                    name: names[i],
                    singer: singers[i],
                    album: albums[i]
                }
                rankArray.push(row);
            }

            return rankArray;
        }
    } catch (err) {
        console.error(err);
    }
}
module.exports.collectRankFromGenie = collectRankFromGenie;