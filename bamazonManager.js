const inquirer = require('inquirer')
const { createConnection } = require('mysql2')

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'bamazon_db'
})


async function getProducts(columns) {
    let response = await new Promise((resolve, reject) => {
        db.query(`SELECT ${columns} FROM products`, (e, r) => {
            if (e) {
                reject(e)
            } else {
                resolve(r)
            }
        })
    })
    return response
}

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

// function to display low inventory items
// let viewInventory = _ => {
//     db.query('SELECT ? FROM products WHERE stock_quantity<100', ['item_id', 'product_name', 'stock_quantity'], (e, data) => {
//         if (e) throw e
//         data.forEach(({ item_id, product_name, stock_quantity }) => console.log(`
//         ID: ${item_id}
//         `)
//         )
//     })
// }



let addInventory = _ => {
    getProducts("item_id")
        .then(r => {
            const productArr = r.map(({ item_id }) => item_id)
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'whichID',
                    message: 'Which item would you like to add stock for?',
                    choices: productArr
                },
                {
                    type: 'input',
                    name: 'howMany',
                    message: 'How many units would you like to add?'
                }
            ])
            .then(({whichID, howMany}) => {
                console.log(whichID)
                console.log(howMany)
                db.query(`UPDATE products SET stock_quantity=stock_quantity+${howMany} WHERE item_id = ${whichID}`)
                console.log(`
                --------------
                The stock quantity for Item ${whichID} has been updated.
                --------------
                `)
            })
        })
        .catch(e => console.log(e))
}

// main menu options and switchcase for what each menu option does
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