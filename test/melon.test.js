const crawler = require('../melon');

describe('melon test', () => {
    const origin = 'https://www.melon.com/chart/index.htm';
    const scrap = {
        name: '.ellipsis.rank01',
        singer: '.ellipsis.rank02',
        album: '.ellipsis.rank03',
    }

    test('멜론 1위 응답 테스트', async () => {
        const rankList = await crawler(origin, scrap);
        expect(rankList[0]).toEqual({
            name: '바라만 본다',
            singer: 'MSG워너비(M.O.M)',
            album: 'MSG워너비 1집'
        })
    });

    test('멜론 100위 포함 테스트', async () => {
        const rankList = await crawler(origin, scrap);
        expect(rankList).toContainEqual({
            name: '바라만 본다',
            singer: 'MSG워너비(M.O.M)',
            album: 'MSG워너비 1집'
        })
    });
})
