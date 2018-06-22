const mysql = require('mysql')

const mysqlConnections = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'aventador',
    database: 'company'
})
mysqlConnections.connect(function(err) {
    if(err){
        console.log(err)
        return
    }

    return console.log('BD is connected')

})

module.exports = mysqlConnections