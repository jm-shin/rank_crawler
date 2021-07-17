const axios = require('axios');
const cheerio = require('cheerio');

const melon = require('./melon');

const type = process.argv[2];

const records = {
    melon: {
        url: 'https://www.melon.com/chart/index.htm',
        scrap: {
            name: '.ellipsis.rank01',
            singer: '.ellipsis.rank02',
            album: '.ellipsis.rank03',
        }
    },
    genie: {
        url: 'https://www.genie.co.kr/chart/top200',
        scrap: {
            name: 'a.title.ellipsis',
            singer: 'a.artist.ellipsis',
            album: 'a.albumtitle.ellipsis',
        }
    },
}

const crawler = async () => {
    const arr = await melon(records.melon.url, records.melon.scrap);
    console.log(arr[0])
    return arr[0];
}

crawler();



