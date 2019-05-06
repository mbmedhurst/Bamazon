const inquirer = require('inquirer')
const { createConnection } = require('mysql2')
// const cTable = require('console.table')
const table = require('easy-table')

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'bamazon_db'
})

let viewSales = _ => {
    db.query(`SELECT * FROM departments`, (e, data) => {
        if (e) throw e
        console.log(table.print(data))
        superMenu()
    })
}


let createDepartment = _ => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Please enter a name for the new department.'
        },
        {
            type: 'input',
            name: 'overhead_costs',
            message: 'Please enter a starting overhead cost for the new department.'
        }
    ])
        .then(department => {
            db.query('INSERT INTO departments SET ?', department, (e) => {
                if (e) throw e
                // console.log(product)
                console.log(`
        *** A new department - ${department.department_name} - has been added to the database ***
    `)
                superMenu()
            })
        })
        .catch(e => console.log(e))
}

let superMenu = _ => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'superMenu',
            message: 'What would you like to do?',
            choices: ['View Product Sales By Department', 'Create New Department']
        }
    ])
        .then(({ superMenu }) => {
            switch (superMenu) {
                case 'View Product Sales By Department':
                    viewSales()
                    break
                case 'Create New Department':
                    createDepartment()
                    break
                case 'Exit App':
                    process.exit()
                default:
                    superMenu()
                    break
            }
        })
        .catch(e => console.log(e))
}


db.connect(e => {
    if (e) throw e
    superMenu()
})