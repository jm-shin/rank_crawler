const { saveFileAsCSV } = require('../lib/saveFile');

describe('saveFile tests', () => {
    test('csv 저장 응답 테스트', async () => {
        const data = [{
                name: '바라만 본다',
                singer: 'MSG워너비(M.O.M)',
                album: 'MSG워너비 1집'
            },
            {
                name:"넌 좋은 사람",
                singer:"SG워너비",
                album:"넌 좋은 사람"
            },
            {
                name:"Permission to Dance",
                singer:"방탄소년단",
                album:"Butter / Permission to Dance"
            }];

        const siteName = 'test';

        const csvFile = await saveFileAsCSV(data, siteName);
        expect(csvFile).toBe(`${siteName} csv-file write success`)
    });
})
