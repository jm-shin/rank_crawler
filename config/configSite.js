module.exports = {
    melon: {
        url: 'https://www.melon.com/chart/index.htm',
        query: {
            name: '.ellipsis.rank01',
            singer: '.ellipsis.rank02',
            album: '.ellipsis.rank03',
        }
    },
    genie: {
        url: 'https://www.genie.co.kr/chart/top200',
        query: {
            name: 'a.title.ellipsis',
            singer: 'a.artist.ellipsis',
            album: 'a.albumtitle.ellipsis',
        }
    },
    bugs: {
        url: 'https://music.bugs.co.kr/chart',
        query: {
            name: 'p.title',
            singer: 'p.artist',
            album: 'div#CHARTrealtime a.album',
        }
    }
}
