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
            mgrMenu()
        }
    })
}

// function to display low inventory items
let viewInventory = _ => {
    db.query('SELECT * FROM products WHERE stock_quantity<100', (e, data) => {
        if (e) console.log(e)
        data.forEach(({ item_id, product_name, stock_quantity }) => console.log(`
        ----------------------------------------------
        ID: ${item_id}
        Product Name: ${product_name}
        In Stock: ${stock_quantity}
        ----------------------------------------------
        `))
        mgrMenu()
    })
}


// function to add inventory to a specified product
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
                .then(({ whichID, howMany }) => {
                    // console.log(whichID)
                    // console.log(howMany)
                    db.query(`UPDATE products SET stock_quantity=stock_quantity+${howMany} WHERE item_id = ${whichID}`)
                    console.log(`
                **** The stock quantity for Item ${whichID} has been updated ****
                `)
                    mgrMenu()
                })
        })
        .catch(e => console.log(e))
}

let addProduct = _ => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'What is the name of the product you would like to add?'
        },
        {
            type: 'list',
            name: 'department_name',
            message: 'Which department should this product be associated with?',
            choices: ['Books', 'Electronics', 'Office', 'Pets', 'Toys', 'Grocery', 'Furniture', 'Entertainment - Music', 'Entertainment - Movies/TV', 'Pharmacy']
        },
        {
            type: 'input',
            name: 'price',
            message: 'What is the unit price of this product?',
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'What is the beginniing stock quantity of this product?'
        },
        {
            type: 'input',
            name: 'product_sales',
            message: 'What is the ytd sales total for this product? Entering 0.00 is ok.'
        }


    ])
        .then(product => {
            db.query('INSERT INTO products SET ?', product, (e) => {
                if (e) throw e
                // console.log(product)
                console.log(`
            *** ${product.product_name} has been added to the database ***
        `)
                mgrMenu()
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