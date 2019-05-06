# Bamazon
A full-service online shopping app that includes a front-end customer order and two backend modules for Managers and Superivsors.

## Database
The sql database has two tables:
- products
- departments

## Customer Module
- View products: app calls products table in the database and displays to customer

![customer views products](./assets/images/productList.jpg)

- Customer can order by specifying product number and quantity

![customer inputs products number and quantity](./assets/images/order_placed.jpg)

- Stock quantity in database is reduced by the appropriate quantity

**Database Before Purchase**

![database before](./assets/images/db_prod_before.jpg)

**Database After Purchase**: Stock quantity is reduced, product sales is increased

![database after](./assets/images/db_prod_after.jpg)


### NPM Packages Used
- msql2
- inquirer

## Manager Module
User has the following options:

![manager menu](./assets/images/mgr_menu.jpg)


- View Products: app calls products table in the database and displays to user

![manager view products](./assets/images/mgr_view_products.jpg)


- View Products w/ Low Inventory: app calls products table in the database to display products with a stock quantity less than 100

![manager view products](./assets/images/mgr_view_low_inventory.jpg)


- Add Inventory: allows user to increase the stock quantity in the products table in the database

![manager add inventory1](./assets/images/add_inv_select_id.jpg)

![manager add inventory2](./assets/images/add_inv_confirm.jpg)

**Database Before Add Inventory**

![database before add inventory](./assets/images/add_inv_before.jpg)

**Database After Add Inventory**: The stock quantity has increased

![database after add inventory](./assets/images/addInvAfter.jpg)

- Add Product: user is able to add a new product to the products table in the database

![add product](./assets/images/add_prod.gif)

**Database Before Add Product**

![database before add product](./assets/images/prod_list_before.jpg)

**Database After Add Product**

![database after add product](./assets/images/prod_list_after.jpg)


### NPM Packages Used
- msql2
- inquirer

## Supervisor Module
User has the following options:

![supervisor menu](./assets/images/super_menu.jpg)

- View Sales: Produces a report that shows total sales and total profit, by department. **Note:** I didn't get this to work completely. The table is working, though the two main columns -- product sales by department and total profit by department are not on it.

![view sales](./assets/images/view_sales.jpg)

- Create Department: allows user to add a new department to the department table in the database

![create department](./assets/images/create_dept.gif)

**Database Before New Department**

![database before add department](./assets/images/dept_list_before.jpg)

**Database After New Department**

![database after add department](./assets/images/dept_list_after.jpg)


### NPM Packages Used
- msql2
- inquirer
- easy table