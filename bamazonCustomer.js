const inquirer = require('inquirer')
const { createConnection } = require('mysql2')

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'bamazon_db'
})

// displays the entire product list
let displayProducts = _ => {
    db.query('SELECT * FROM products', (e, data) => {
        if (e) throw e
        data.forEach(({ item_id, product_name, department_name, price, stock_quantity }) => console.log(`
            **********************************
            ID: ${item_id}
            Product: ${product_name}
            Department: ${department_name}
            Price: $${price}
            In Stock: ${stock_quantity}
            **********************************
            `))
        takeOrder()
    })
    }

// function to ask customer which product they want to buy and how many
let takeOrder = _ => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'askID',
            message: 'Please enter the ID number of the product you would like to buy.',
        },
        {
            type: 'input',
            name: 'howMany',
            message: 'How many units of this product would you like?'
        }
    ])
        .then(({ askID, howMany }) => {
            // console.log(askID)
            // console.log(howMany)
            processOrder(askID, howMany)

        })
        .catch(e => console.log(e))
}

// function to check stock and confirm order
let processOrder = (askID, howMany) => {
    db.query(`SELECT * FROM products WHERE item_id = ${askID}`, (e, [{ product_name, price, stock_quantity }]) => {
        if (e) throw e
        if (stock_quantity >= howMany) {
            console.log(`
                ***********************************
                          ORDER CONFIRMATION
                ***********************************

                    Qty: ${howMany} 
                    Product Name: ${product_name}
                    TOTAL: $${price * howMany}

                ***********************************
            `)
            // stock quantity is updated in the database
            // "UPDATE products SET field1 = 'value1', field2 = '$val2', field3 = 5 WHERE
            db.query(`UPDATE products SET stock_quantity = stock_quantity-${howMany}, product_sales = product_sales+${price*howMany} WHERE item_id = ${askID}`, (e, data) => {
                if (e) throw e
                
            })
        } else {
            console.log(`
                ******************************************

                Insufficient Quantity - Please try again.

                ******************************************
            `)
            }
            takeOrder()
    }
    )}

db.connect(e => {
    if (e) throw e
    displayProducts()
})