const fs = require('fs');
const path = require('path');
const logger = require('./logger');

function getCurTime() {
    let dt = new Date();
    let yy = dt.getFullYear();
    let mm = dt.getMonth() + 1;
    let dd = dt.getDate();

    mm = (mm < 10 ? '0' : '') + mm;
    dd = (dd < 10 ? '0' : '') + dd;

    return `${yy}-${mm}-${dd}`;
}

const saveFileAsCSV = (data, siteName) => {
    const makeHeader = () => new Promise((resolve, reject) => {
        try {
            const length = [];
            data.forEach((item) => {
                length.push(Object.keys(item).length);
            });
            const index = length.indexOf(Math.max.apply(null, length));
            return resolve(Object.keys(data[index]));
        } catch (err) {
            return reject(err);
        }
    });

    const makeCSV = (header) => new Promise((resolve, reject) => {
        try {
            const body = [];
            data.forEach((i) => {
                header.forEach((j) => {
                    body.push(typeof i[j] !== 'undefined' ? i[j] : '');
                });
            });
            const headerLen = header.length;
            let result = header.join();
            result += '\n';
            body.forEach((item, index) => {
                result += item;
                if (Number(index + 1) % headerLen === 0) {
                    result += '\n';
                } else {
                    result += ',';
                }
            });
            return resolve(result);
        } catch (err) {
            return reject(err);
        }
    });

    const csvFileDir = path.join(__dirname, '../csv');
    const csvFileLoc = csvFileDir + `/${getCurTime()}-${siteName}.csv`;
    !fs.existsSync(csvFileDir) && fs.mkdirSync(csvFileDir);

    const saveFile = (csv) => new Promise((resolve, reject) => {
        fs.writeFile(csvFileLoc, csv, (err) => {
            if (err) return reject(err);
            return resolve(`${siteName} csv-file write success`);
        });
    });

    return makeHeader().then( async (header) => {
        try {
            const csv = await makeCSV(header);
            const result = await saveFile(csv);
            console.log(result);
            logger.info(result);
            return result;
        } catch (err) {
            console.log(err);
        }
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.saveFileAsCSV = saveFileAsCSV;