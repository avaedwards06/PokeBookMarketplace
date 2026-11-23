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
 'Polywag_Plushie_JuliesPlushies.jpg', 169),

((SELECT ID FROM Vendor WHERE Name = 'Red and White Art'),
 (SELECT ID FROM Item WHERE Name = 'Large picture'),
 'Assorted Pokemon 20 inch Artwork', 25.00,
 'Beautiful large picture of Red and White Artist Akane Okimori''s Pokemon artwork. Perfect for decorating your room or office.',
 'AssortedPokemon_LargePicture_RedAndWhiteArt.jpg', 5),

 ((SELECT ID FROM Vendor WHERE Name = 'Pokestop Eatery'),
 (SELECT ID FROM Item WHERE Name = 'Cookies'),
 'Assorted Surgar Cookies 12 Pack', 12.00,
 'Assorted sugar cookies with Pokemon designs. Perfect for a party or just a snack.',
 'AssortedSugarCookies_PokestopEatery.jpg', 300),

 ((SELECT ID FROM Vendor WHERE Name = 'Pokefigures'),
 (SELECT ID FROM Item WHERE Name = 'Chibi Figure'),
 'Chibi Team Rocket Figure Pack', 35.00,
 'Adorable chibi team rocket figures. Perfect for collectors or as a gift for a Pokemon fan.',
 'ChibiTeamRocketSetPokeFigures.jpg', 12),

 ((SELECT ID FROM Vendor WHERE Name = 'Chloe''s Cards'),
 (SELECT ID FROM Item WHERE Name = 'Pokemon Card Pack'),
 'Cute Cat Card Bundle', 19.00,
 'Adorable cute cat cards. Perfect for collectors or as a gift for a Pokemon fan.',
 'Cute_Cat_Card_Bundle_ChloesCards.jpg', 1),

 ((SELECT ID FROM Vendor WHERE Name = 'PokeArtistry'),
 (SELECT ID FROM Item WHERE Name = 'Wallet Card'),
 'Eevee Vaporeon Wallet Card', 24.00,
 'Adorable Eevee Vaporeon wallet card. Perfect for collectors or as a gift for a Pokemon fan.',
 'EeveeVaporeonWalletCard_PokeArtistry.jpg', 7),

 ((SELECT ID FROM Vendor WHERE Name = 'X-TREME Card Deals'),
 (SELECT ID FROM Item WHERE Name = 'Pokemon Card'),
 'Graded Rainbow Rare Charizard Card', 24.00,
 'Epic Graded Rainbow Rare Charizard card. In Prime condition. Perfect for collectors or as a gift for a Pokemon fan.',
 'GradedRainbowRareCharizardCard_XTREMECardDeals.jpg', 1),

 ((SELECT ID FROM Vendor WHERE Name = 'Charmix'),
 (SELECT ID FROM Item WHERE Name = 'Mini vinyl bag charm'),
 'Jigglypuff Mini Bag Charm', 8.00,
 'Adorable Jigglypuff mini bag charm. An absolute must for fairy pokemon lovers.',
 'JigglypuffBagCharm_Charmix.jpg', 17),

 ((SELECT ID FROM Vendor WHERE Name = 'Wonders of Pokemon'),
 (SELECT ID FROM Item WHERE Name = 'Pokemon Manga'),
 'Pokemon Adventures Volume 1', 12.00,
 'The first volume of the popular Pokemon Adventures manga series.',
 'PokemonAdventuresVolume1_WondersOfPokemon.jpg', 35),

 ((SELECT ID FROM Vendor WHERE Name = 'Action-mon'),
 (SELECT ID FROM Item WHERE Name = 'Blind Box Figure'),
 'Pokemon Chinese Exclusive Dream Drawing 151 Figurine Toy Blind Box', 12.00,
 'Extremely rare and collectible Pokemon Chinese Exclusive Dream Drawing 151 Figurine Toy Blind Box.',
 'PokemonChineseExclusiveDreamDrawing151FigurineToyBlindBox_Actionmon.jpg', 15),

 ((SELECT ID FROM Vendor WHERE Name = 'Sturdy Strong Pokemon'),
 (SELECT ID FROM Item WHERE Name = 'Foldable Chair'),
 'Kids Folding Beach Chair', 12.00,
 'Lightweight and portable kids folding beach chair. Perfect for a day at the beach or a picnic in the park.',
 'PokemonKidsFoldingBeachChair_SturdyStrongPokemon.jpg', 65),

 ((SELECT ID FROM Vendor WHERE Name = 'Wonders of Pokemon'),
 (SELECT ID FROM Item WHERE Name = 'Pokemon Manga'),
 'Pokemon Scarlet and Violet Volume 1', 12.00,
 'The first volume of the popular Pokemon Scarlet and Violet manga series.',
 'PokemonScarletAndVioletVolume1_WondersOfPokemon.jpg', 26),

 ((SELECT ID FROM Vendor WHERE Name = 'Snorlax Co.'),
 (SELECT ID FROM Item WHERE Name = 'Nightlight'),
 'Sleepy Pikachu Nightlight', 37.00,
 'A cute nightlight featuring Sleepy Pikachu. Perfect for Young Pokemon fans.',
 'SleepyPikachuNightlight_SnorlaxCo.jpg', 55),

 ((SELECT ID FROM Vendor WHERE Name = 'Snorlax Co.'),
 (SELECT ID FROM Item WHERE Name = 'Bean bag chair'),
 'Snorlax Bean Bag Chair', 37.00,
 'A cute bean bag chair of Snorlax. Perfect for the sleepiest of pokemon fans.',
 'SnorlaxBeanBagChair_SnorlaxCo.jpg', 47);