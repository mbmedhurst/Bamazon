-- DROP DATABASE bamazon_db;
-- CREATE DATABASE bamazon_db;

-- CREATE TABLE products (
--  item_id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
--  product_name VARCHAR(25) NOT NULL,
--  department_name VARCHAR(25) NOT NULL,
--  price FLOAT (5, 2) NOT NULL,
--  stock_quantity INT(4)
--  )

-- DELETE FROM products WHERE product_name = "Test DVD";


USE bamazon_db;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Patio Chair (set of 2)", "Furniture", 219.00, 20), ("Heinz Baked Beans (12pk)", "Grocery", 32.50, 20), 
("Flexi Hose (30foot)", "Garden", 15.49, 60), ("Bookshelf (set of 2)", "Furniture", 99.99, 10), ("Turntable/Speakers", "Electronics", 349.00, 5),
("Slip 'n Slide", "Games", 10.50, 3), ("Krazy Kat Catnip", "Pets", 3.99, 10), ("Massive 55in TV", "Electronics", 349.99, 18),
("Doggie Doze Dog Bed", "Pets", 27.50, 1), ("My First Laptop", "Games", 30.49, 18), ("Coding Barbie", "Games", 19.99, 4);