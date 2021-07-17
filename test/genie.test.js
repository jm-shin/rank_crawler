const crawler = require('../genie');

describe('genie test',  () => {
    const origin = 'https://www.genie.co.kr/chart/top200';

    test('지니 1위 응답 테스트', async () => {
        const rankList = await crawler(origin);
        expect(rankList[0]).toEqual({
            name: '바라만 본다',
            singer: 'MSG워너비 (M.O.M)',
            album: 'MSG워너비 1집' })
    });

    test('지니 100위 포함 테스트', async () => {
        const rankList = await crawler(origin);
        expect(rankList).toContainEqual( {
            name: '내 손을 잡아',
            singer: '아이유 (IU)',
            album: '최고의 사랑 OST Part.4 (MBC 수목드라마)'
        })
    });
})
