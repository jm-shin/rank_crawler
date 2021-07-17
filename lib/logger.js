const fs = require('fs');
const path = require('path');
const util = require('util');

const logfileDir = path.join(__dirname, '../logs');
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const date = today.getDate();
const logDate = `${year}-${month}-${date}`;
const logfileName = logfileDir + `/${logDate}.log`;

//exist check
!fs.existsSync(logfileDir) && fs.mkdirSync(logfileDir);

const logfile = fs.createWriteStream(logfileName, {flags : 'a+'});

const debug = (txt) => {
    logfile.write(`[ ${getCurTime()} ][DEB] ` + util.format(txt) + '\n');
}

const info = (txt) => {
        logfile.write(`[ ${getCurTime()} ][INF] ` + util.format(txt) + '\n');
}

const error = (txt) => {
    logfile.write(`[ ${getCurTime()} ][ERR] ` + util.format(txt) + '\n');
}

function getCurTime() {
    let dt = new Date();
    let yy = dt.getFullYear();
    let mm = dt.getMonth() + 1;
    let dd = dt.getDate();
    let hh = dt.getHours();
    let mi = dt.getMinutes();
    let ss = dt.getSeconds();

    mm = (mm < 10 ? '0' : '') + mm;
    dd = (dd < 10 ? '0' : '') + dd;
    hh = (hh < 10 ? '0' : '') + hh;
    mi = (mi < 10 ? '0' : '') + mi;
    ss = (ss < 10 ? '0' : '') + ss;

    let ymd = `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`;

    return ymd;
}

module.exports = { info, debug, error };