-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT productname, categoryname 
FROM product
join category on product.categoryid = category.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT id, companyname 
from [Order]
join shipper on [Order].shipvia = shipper.id where orderdate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT productname, quantity
FROM orderdetail
JOIN product on orderdetail.productid = product.id where orderid = 10251
ORDER BY productname;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT id, companyname, lastname
FROM [Order]
JOIN Customer on [Order].customerid  = customer.id
JOIN employee on [Order].employeeid = employee.id;
