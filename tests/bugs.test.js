const crawler = require('../lib/bugs').collectRankFromBugs;
const config = require('../config/configSite').bugs;

describe('bugs tests', () => {
    const url = config.url;
    const query = config.query;

    test('벅스 1위 응답 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList[0]).toEqual({
            name: '좋아좋아',
            singer: '조정석',
            album: '슬기로운 의사생활 시즌2 OST Part 5'
        })
    });

    test('벅스 100위 포함 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList).toContainEqual({
            name: '치맛바람 (Chi Mat Ba Ram)',
            singer: '브레이브걸스(Brave Girls)',
            album: 'Summer Queen'
        })
    });

    test('벅스 100개 응답 테스트', async () => {
        const rankList = await crawler(url, query);
        expect(rankList.length).toBe(100)
    });
})
