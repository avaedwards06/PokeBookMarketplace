-- -------------------------------------------------------------
-- Items: the catalog of product types
-- -------------------------------------------------------------
INSERT INTO Item (Name)
VALUES
('Sweatshirt'),
('Sweatpants'),
('Dress'),
('Beanie'),
('Gloves'),
('Poncho'),
('T-Shirt'),
('Long Sleeve Shirt'),
('Mini Plush'),
('Small Plush'),
('Medium Plush'),
('Large Plush'),
('Mega Large Plush'),
('Pokemon Card'),
('Pokemon Card Pack'),
('Binder'),
('Card Sleeves'),
('Wallet Card'),
('Small picture'),
('Medium picture'),
('Large pictures'),
('Art sleeve'),
('Mini knitted bag charm'),
('Mini vinyl bag charm'),
('Starter pokemon charm'),
('Mystery Box Charm'),
('Large fluffy bag charm'),
('Lampshade'),
('Nightlight'),
('Foldable Chair'),
('Mini Mirror'),
('Bean bag chair'),
('Pokemon Manga'),
('Field Guide'),
('Did you know?'),
('Short Stories'),
('Fruit snacks'),
('Hot Buns'),
('Cookies'),
('Lattes'),
('Cupcakes'),
('Logo'),
('Bath mat'),
('Outdoor rug'),
('Small Indoor rug'),
('Large Indoor rug'),
('Chibi Figure'),
('Blind Box Figure'),
('Action Figure'),
('Funko Pop');

-- -------------------------------------------------------------
-- Markets (inserted in this order so the IDs match main.js)
-- -------------------------------------------------------------
INSERT INTO Market (Name)
VALUES
('Clothing'),
('Plushie'),
('Pokemon Card'),
('Fan Art'),
('Bag Charm'),
('Furniture'),
('Books'),
('Food'),
('Rug'),
('Figurines');

-- -------------------------------------------------------------
-- Vendors (2 per market)
-- -------------------------------------------------------------
INSERT INTO Vendor (MarketID, Name)
VALUES
((SELECT ID FROM Market WHERE Name = 'Clothing'), 'Totally Styling'),
((SELECT ID FROM Market WHERE Name = 'Clothing'), 'DENSOKU'),
((SELECT ID FROM Market WHERE Name = 'Plushie'), 'Julie''s Plushies'),
((SELECT ID FROM Market WHERE Name = 'Plushie'), 'PokePoke Pocket Plushies'),
((SELECT ID FROM Market WHERE Name = 'Pokemon Card'), 'Chloe''s Cards'),
((SELECT ID FROM Market WHERE Name = 'Pokemon Card'), 'X-TREME Card Deals'),
((SELECT ID FROM Market WHERE Name = 'Fan Art'), 'Red and White Art'),
((SELECT ID FROM Market WHERE Name = 'Fan Art'), 'PokeArtistry'),
((SELECT ID FROM Market WHERE Name = 'Bag Charm'), 'Dingle Dangles'),
((SELECT ID FROM Market WHERE Name = 'Bag Charm'), 'Charmix'),
((SELECT ID FROM Market WHERE Name = 'Furniture'), 'Snorlax Co.'),
((SELECT ID FROM Market WHERE Name = 'Furniture'), 'Sturdy Strong Pokemon'),
((SELECT ID FROM Market WHERE Name = 'Books'), 'Pokeguides and More!'),
((SELECT ID FROM Market WHERE Name = 'Books'), 'Wonders of Pokemon'),
((SELECT ID FROM Market WHERE Name = 'Food'), 'Pokestop Eatery'),
((SELECT ID FROM Market WHERE Name = 'Food'), 'Pokemon Cafe'),
((SELECT ID FROM Market WHERE Name = 'Rug'), 'Rob''s Rugs'),
((SELECT ID FROM Market WHERE Name = 'Rug'), 'Rurururugs!'),
((SELECT ID FROM Market WHERE Name = 'Figurines'), 'Poke-figures'),
((SELECT ID FROM Market WHERE Name = 'Figurines'), 'Action-mon');

-- -------------------------------------------------------------
-- VendorSells: each vendor's listings
-- (must match the real file name exactly)
-- -------------------------------------------------------------
INSERT INTO VendorSells (VendorID, ItemID, Title, Price, Description, Photo, Stock)
VALUES
((SELECT ID FROM Vendor WHERE Name = 'Totally Styling'),
 (SELECT ID FROM Item WHERE Name = 'Gloves'),
 'Vanillite Gloves', 14.95,
 'Kawaii Cute Frosty Vanillite Inspired Gloves perfect for the chilly Pokemon Catching Season!',
 'Vanillite_Gloves_TotallyStyling.jpg', 43),

((SELECT ID FROM Vendor WHERE Name = 'DENSOKU'),
 (SELECT ID FROM Item WHERE Name = 'Sweatshirt'),
 'Pikachu Hoodie', 36.00,
 'Sleek, Soft, Irresistible Pikachu Hoodie.',
 'Pikachu_Hoodie_DENSOKU.jpg', 20),

((SELECT ID FROM Vendor WHERE Name = 'Julie''s Plushies'),
 (SELECT ID FROM Item WHERE Name = 'Large Plush'),
 'Large Mosslax Plushie', 40.00,
 '30in incredibly soft Mosslax plushie',
 'Mosslax_Plushie_JuliesPlushies.jpg', 10),

((SELECT ID FROM Vendor WHERE Name = 'Julie''s Plushies'),
 (SELECT ID FROM Item WHERE Name = 'Mini Plush'),
 'Mini Poliwag Plushie', 10.00,
 '4in incredibly soft Poliwag plushie for desks or shelves',
 'Polywag_Plushie_JuliesPlushies.jpg', 169);