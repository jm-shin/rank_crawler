const crawler = require('../src/genie').collectRankFromGenie;
const config = require('../config/configSite').genie;

describe('genie tests',  () => {
    const url = config.url;
    const query = config.query;

    test('지니 1위 응답 테스트', async () => {
        const rankList = await crawler(url);
        expect(rankList[0]).toEqual({
            name: '바라만 본다',
            singer: 'MSG워너비 (M.O.M)',
            album: 'MSG워너비 1집' })
    });

    test('지니 50위 포함 테스트', async () => {
        const rankList = await crawler(url);
        expect(rankList).toContainEqual( {
            name: 'Alcohol-Free',
            singer: 'TWICE (트와이스)',
            album: 'Taste of Love'
        })
    });

    test('지니 50개 응답 테스트', async () => {
        const rankList = await crawler(url);
        expect(rankList.length).toBe(50)
    });
})
