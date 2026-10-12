### Summary of what we did:

We removed the Shipping table, as it was redundant. All of the data inside of our Shipping table depended directly on our OrderID table as the primary key identifier. We modified our tables Vendor_Sells and Customer_Order by removing the underscores for consistency and a cleaner look. Every table now serves a function and we no longer have any transitive dependencies.
