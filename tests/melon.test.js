const crawler = require('../src/melon').collectRankFromMelon;
const config = require('../config/configSite').melon;

describe('melon tests', () => {
    const url = config.url;
    const query = config.query;

    test('멜론 1위 응답 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList[0]).toEqual({
            name: '바라만 본다',
            singer: 'MSG워너비(M.O.M)',
            album: 'MSG워너비 1집'
        })
    });

    test('멜론 100위 포함 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList).toContainEqual({
            name: '바라만 본다',
            singer: 'MSG워너비(M.O.M)',
            album: 'MSG워너비 1집'
        })
    });

    test('멜론 100개 응답 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList.length).toBe(100)
    });
})
