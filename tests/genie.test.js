const crawler = require('../lib/genie').collectRankFromGenie;
const config = require('../config/configSite').genie;

describe('genie tests',  () => {
    const url = config.url;
    const query = config.query;

    test('지니 1위 응답 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList[0]).toEqual({
            name: '바라만 본다',
            singer: 'MSG워너비 (M.O.M)',
            album: 'MSG워너비 1집' })
    });

    test('지니 50위 포함 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList).toContainEqual( {
            album: "신호등",
            name: "신호등",
            singer: "이무진"
        })
    });

    test('지니 50개 응답 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList.length).toBe(50)
    });
})
