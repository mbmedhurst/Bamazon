DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;


USE bamazon_db;

CREATE TABLE products (
 item_id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 product_name VARCHAR(200) NOT NULL,
 department_name VARCHAR(200) NOT NULL,
 price FLOAT (5, 2) NOT NULL,
 stock_quantity INT(4)
 )
