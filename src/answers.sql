-- Problem 1
SELECT email 
FROM customers
ORDER BY email ASC;

-- Problem 2
SELECT id 
FROM customers
WHERE fname = 'Elizabeth'; -- Getting the id for Elizabeth

--  id 
-- ----
--   1

SELECT id
FROM orders
WHERE customer_id = '1';

-- Problem 3
SELECT SUM(num_cupcakes)
FROM orders
WHERE processed = 'f';

-- Problem 4
SELECT cupcakes.name, SUM(orders.num_cupcakes) AS sum
FROM cupcakes
LEFT JOIN orders 
ON cupcakes.id = orders.cupcake_id
GROUP BY cupcakes.name
ORDER BY cupcakes.name;

-- Problem 5
SELECT customers.email, SUM(orders.num_cupcakes) AS total
FROM customers
LEFT JOIN orders
ON customers.id = orders.customer_id 
GROUP BY customers.email
ORDER BY total DESC;

-- Problem 6
SELECT customers.fname, customers.lname, customers.email
FROM customers
INNER JOIN orders 
ON customers.id = orders.customer_id
INNER JOIN cupcakes 
ON orders.cupcake_id = cupcakes.id
WHERE orders.processed = true
AND cupcakes.name = 'funfetti'
GROUP BY customers.id;
