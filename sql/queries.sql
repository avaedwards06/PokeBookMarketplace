USE pokebook;

------------ Customer Queries ------------
-- 1. Customer login
-- Checks if the username and password match an account.
Table: Customer
SELECT ID, UserName, Email
FROM Customer
WHERE UserName = 'place_holder'
  AND Password = SHA2('PasswordHere!20', 256);


-- 2. List all markets
-- Shows every market in the homepage.
Table: Market
SELECT ID, Name
FROM Market
ORDER BY Name;


-- 3. Browse a market
-- Shows in-stock products in one market and who sells them.
Table: Vendor, VendorSells, Item
SELECT VendorSells.ID AS ListingID,Item.Name AS Category, VendorSells.Title, VendorSells.Price, VendorSells.Description, Vendor.Name AS Vendor, VendorSells.Stock
FROM Vendor
JOIN VendorSells ON VendorSells.VendorID = Vendor.ID
JOIN Item ON Item.ID = VendorSells.ItemID
WHERE Vendor.MarketID = 1
  AND VendorSells.Stock > 0
ORDER BY Item.Name, VendorSells.Title;


-- 4. Search products
-- Finds in-stock products by name (search bar).
Table: Item, VendorSells, Vendor, Market
SELECT VendorSells.ID AS ListingID, Item.Name AS Category, VendorSells.Title, VendorSells.Price, VendorSells.Description, Vendor.Name AS Vendor, Market.Name AS Market
FROM VendorSells
JOIN Item ON VendorSells.ItemID = Item.ID
JOIN Vendor ON Vendor.ID = VendorSells.VendorID
JOIN Market ON Market.ID = Vendor.MarketID
WHERE (Item.Name LIKE '%plush%' OR VendorSells.Title LIKE '%plush%')
  AND VendorSells.Stock > 0
ORDER BY VendorSells.Price;


-- 5. “My order” history
-- Lists a customer’s orders, newest first, with status and tracking.
Table: CustomerOrder
SELECT ID AS OrderID, OrderDate, Status, TotalPrice, TrackingNumber
FROM CustomerOrder
WHERE CustomerID = 7
ORDER BY OrderDate DESC;


-- 6. Order details
-- Shows the items in one order and which vendor sold which.
Table: OrderItem, Item, Vendor
SELECT VendorSells.Title AS Product, Item.Name AS Category, Vendor.Name AS Vendor, OrderItem.QUANTITY,
       OrderItem.ItemPrice,
       OrderItem.QUANTITY * OrderItem.ItemPrice AS LineTotal
FROM OrderItem
JOIN VendorSells ON VendorSells.ID = OrderItem.VendorSellsID
JOIN Item ON Item.ID = VendorSells.ItemID
JOIN Vendor ON Vendor.ID = VendorSells.VendorID
WHERE OrderItem.OrderID = 9;


------------ Vendor Queries ------------
-- 7. My inventory
-- Shows every product the vendor sells and how many are left.
Table: VendorSells, Item
SELECT VendorSells.ID AS ListingID, Item.Name AS Category, VendorSells.Title AS Product, VendorSells.Price, VendorSells.Description, VendorSells.Stock
FROM VendorSells
JOIN Item ON Item.ID = VendorSells.ItemID
WHERE VendorSells.VendorID = 2
ORDER BY Item.Name, VendorSells.Title;


-- 8. Low-stock (alert)
-- Shows products with fewer than 5 left so the vendor can restock. 
Table: VendorSells, Item
SELECT VendorSells.ID AS ListingID, Item.Name AS Category, VendorSells.Title AS Product, VendorSells.Stock
FROM VendorSells
JOIN Item ON Item.ID = VendorSells.ItemID
WHERE VendorSells.VendorID = 1
  AND VendorSells.Stock < 5
ORDER BY VendorSells.Stock;


-- 9. My orders
-- Shows orders that include the vendor’s items and where to ship them.
Table: OrderItem, CustomerItem, Customer, Item
SELECT CustomerOrder.ID AS OrderID, CustomerOrder.OrderDate,
       CustomerOrder.Status, Customer.UserName, Customer.Address,
       VendorSells.Title AS Product, OrderItem.QUANTITY
FROM OrderItem
JOIN VendorSells ON VendorSells.ID = OrderItem.VendorSellsID
JOIN CustomerOrder ON CustomerOrder.ID = OrderItem.OrderID
JOIN Customer ON Customer.ID = CustomerOrder.CustomerID
WHERE OrderItem.VendorID = 3
ORDER BY CustomerOrder.OrderDate DESC;


------------ Manager Queries ------------
-- 10. Vendors per market
-- Counts how many vendors are in each market
Table: Market, Vendor
SELECT Market.Name AS Market, COUNT(Vendor.ID) AS Vendors
FROM Market
LEFT JOIN Vendor ON Vendor.MarketID = Market.ID
GROUP BY Market.ID, Market.Name
ORDER BY Market.Name;


-- 11. Sales by vendors
-- Adds up each vendor’s sales, not counting cancelled orders.
Table: OrderItem, Vendor, CustomerOrder
SELECT Vendor.Name AS Vendor,
       SUM(OrderItem.QUANTITY * OrderItem.ItemPrice) AS Revenue
FROM OrderItem
JOIN VendorSells ON VendorSells.ID = OrderItem.VendorSellsID
JOIN Vendor ON Vendor.ID = VendorSells.VendorID
JOIN CustomerOrder ON CustomerOrder.ID = OrderItem.OrderID
WHERE CustomerOrder.Status <> 'Cancelled'
GROUP BY Vendor.ID, Vendor.Name
ORDER BY Revenue DESC;

-- 12. Best-selling products
-- Shows the top 5 products by units sold, not counting cancelled orders.
Table: OrderItem, Item, CustomerOrder
SELECT VendorSells.Title AS Product, Vendor.Name AS Vendor, SUM(OrderItem.QUANTITY) AS UnitsSold
FROM OrderItem
JOIN VendorSells ON VendorSells.ID = OrderItem.VendorSellsID
JOIN Vendor ON Vendor.ID = VendorSells.VendorID
JOIN CustomerOrder ON CustomerOrder.ID = OrderItem.OrderID
WHERE CustomerOrder.Status <> 'Cancelled'
GROUP BY VendorSells.ID, VendorSells.Title,Vendor.Name
ORDER BY UnitsSold DESC
LIMIT 5;


-- 13. Waiting for shipping (orders)
-- Lists Pending and Processing orders, oldest first.
Table: CustomerOrder, Customer
SELECT CustomerOrder.ID AS OrderID, Customer.UserName,
       CustomerOrder.OrderDate, CustomerOrder.Status,
       CustomerOrder.TotalPrice
FROM CustomerOrder
JOIN Customer ON Customer.ID = CustomerOrder.CustomerID
WHERE CustomerOrder.Status IN ('Pending', 'Processing')
ORDER BY CustomerOrder.OrderDate;
