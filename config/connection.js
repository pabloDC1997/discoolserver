const MySQL = require('mysql');

module.exports = function() {
    return MySQL.createPool({
        connectionLimit: 25,
        dateStrings: true,
        multipleStatements: true,
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '-----', //FIXME
        database: 'discool_db'
    });
}
