const inquirer = require('inquirer')
const { createConnection } = require('mysql2')

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'bamazon_db'
})

// displays the entire product list
let viewProducts = _ => {
    db.query('SELECT * FROM products', (e, data) => {
        if (e) {
            console.log(e)
        } else {
            data.forEach(({ item_id, product_name, department_name, price, stock_quantity }) => console.log(`
                **********************************
                ID: ${item_id}
                Product: ${product_name}
                Department: ${department_name}
                Price: $${price}
                In Stock: ${stock_quantity}
                **********************************
            `))
        }
    })
}


let mgrMenu = _ => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View Products For Sale', 'View Low Inventory', 'Add New Inventory', 'Add New Product', 'Exit App']
        }
    ])
        .then(({ menu }) => {
            switch (menu) {
                case 'View Products For Sale':
                    viewProducts()
                    break
                case 'View Low Inventory':
                    viewInventory()
                    break
                case 'Add New Inventory':
                    addInventory()
                    break
                case 'Add New Product':
                    addProduct()
                    break
                case 'Exit App':
                    process.exit()
                default:
                    mgrMenu()
                    break
            }
        })
        .catch(e => console.log(e))
}

db.connect(e => {
    if (e) throw e
    mgrMenu()
})