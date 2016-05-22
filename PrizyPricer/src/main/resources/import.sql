insert into product(barcode, description) values (123450, 'Tea Mug0');
insert into product(barcode, description) values (123451, 'Tea Mug1');
insert into product(barcode, description) values (123452, 'Tea Mug2');
insert into product(barcode, description) values (123453, 'Tea Mug3');

insert into product(barcode, description) values (123454, 'Coffee Mug Red');
insert into product(barcode, description) values (123455, 'Coffee Mug Blue');
insert into product(barcode, description) values (123456, 'Coffee Mug Black');
insert into product(barcode, description) values (123457, 'Coffee Mug White');

--insert in store table--
insert into store(id, name, location) values (1, 'store 1', 'location A');
insert into store(id, name, location) values (2, 'store 2', 'location B');
insert into store(id, name, location) values (3, 'store 3', 'location C');

insert into productprice(id, barcode, storeid, price, notes) values (1, 123450 , 1, 100.20, 'first Price');
insert into productprice(id, barcode, storeid, price, notes) values (2, 123450 , 1, 101.20, 'second Price');
insert into productprice(id, barcode, storeid, price, notes) values (3, 123450 , 1, 102.20, 'third Price');
insert into productprice(id, barcode, storeid, price, notes) values (4, 123450 , 1, 100.40, 'fourth Price');
insert into productprice(id, barcode, storeid, price, notes) values (5, 123450 , 1, 100.60, 'fifth Price');
insert into productprice(id, barcode, storeid, price, notes) values (6, 123450 , 1, 101.30, 'sixth Price');
insert into productprice(id, barcode, storeid, price, notes) values (7, 123450 , 1, 101.50, 'seventh Price');
insert into productprice(id, barcode, storeid, price, notes) values (8, 123450 , 1, 100.80, 'eight Price');
insert into productprice(id, barcode, storeid, price, notes) values (9, 123450 , 1, 102.00, 'ninth Price');
insert into productprice(id, barcode, storeid, price, notes) values (10,123450 , 1, 101.30, 'tenth Price');

insert into productprice(id, barcode, storeid, price, notes) values (11, 123451 , 1, 210.20, 'first Price');
insert into productprice(id, barcode, storeid, price, notes) values (12, 123451 , 1, 221.20, 'second Price');
insert into productprice(id, barcode, storeid, price, notes) values (13, 123451 , 1, 212.20, 'third Price');
insert into productprice(id, barcode, storeid, price, notes) values (14, 123451 , 1, 210.40, 'fourth Price');
insert into productprice(id, barcode, storeid, price, notes) values (15, 123451 , 1, 220.60, 'fifth Price');
insert into productprice(id, barcode, storeid, price, notes) values (16, 123451 , 1, 211.30, 'sixth Price');
insert into productprice(id, barcode, storeid, price, notes) values (17, 123451 , 1, 241.50, 'seventh Price');
insert into productprice(id, barcode, storeid, price, notes) values (18, 123451 , 1, 230.80, 'eight Price');
insert into productprice(id, barcode, storeid, price, notes) values (19, 123451 , 1, 212.00, 'ninth Price');
insert into productprice(id, barcode, storeid, price, notes) values (20, 123451 , 1, 221.30, 'tenth Price');

