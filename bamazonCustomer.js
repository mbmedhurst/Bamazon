const inquirer = require('inquirer')
const {createConnection} = require('mysql2')

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'bamazon_db'
})

db.connect(e => {
    if(e) {console.log(e)
    } else {
        console.log('Successful connection...')
    } 
})