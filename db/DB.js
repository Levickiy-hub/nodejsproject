const db = require('./DBConfig');
const { Op } = require("sequelize");
async function UserCreate(name, login, password, role) {
   db.User.create({
        name: name,
        login: login,
        password: password,
        role: role
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));

};
async function UserFindByLogin(login) {
    const user =await db.User.findOne({ where: { login: login }, raw: true });
    return user;
};
async function GetUsers() {
    const users = await db.User.findAll();
    return users;
};
function deleteUsers(id) {
    db.User.destroy({ where: {id:id}});
};
function ShopCreate(name, address,info,locationX,locationY) {
    db.Shop.create({
        name: name,
        address: address,
        info: info,
        locationX: locationX,
        locationY: locationY
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));

}
async function GetShops() {
    const shops = await db.Shop.findAll();
    return shops;
}
async function GetShopsByName(name) {
    const shops = await db.Shop.findOne({ where: {name:name}});
    return shops;
}
async function GetShopsById(id) {
    const shops = await db.Shop.findOne({ where: { id: id } });
    return shops;
}
async function GetShopsByLocation(x,y) {
    const shops = await db.Shop.findOne({ where: { locationX: x, locationY: y} });
    return shops;
}
async function ProductCreate(name, description, price, idshop,iduser) {
    const prod = await db.Product.findOne({ where: { name: name }, raw: true });
    if (!prod) {
        db.Product.create({
            name: name,
            description: description
        }).then(res => {
            console.log(res);
            db.ProductShop.create({
                idproduct: res.id,
                idshop: idshop,
                price: price,
                instokc: 0,
                iduser: iduser
            }).then(res => {
                console.log(res);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    } else {
        db.ProductShop.create({
            idproduct: prod.id,
            idshop: idshop,
            price: price,
            instokc: 0,
            iduser: iduser
        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }
}
async function GetProducts() {
    const products = await db.Product.findAll();
    return products;
}
async function GetProductsByName(name) {
    const product = await db.Product.findAll({ where: { name: name } });
    console.log(product);
    return product;
}
async function GetProductsByShop(id) {
    const productshop = await db.ProductShop.findAll({ where: { idshop: id,instokc:true }, raw: true });
    const product = [];
    for (var i = 0; i < productshop.length;i++)
    product.push(await db.Product.findOne({ where: { id: productshop[i].idproduct }}));
    return product;
}
async function GetProductsPriceByShop(id) {
    const product = await db.ProductShop.findAll({ where: { idshop: id,instokc:true }, raw: true });
    const price = [];
    for (var i = 0; i < product.length; i++)
        price.push(product[i].price);
    return price;
}
async function GetShopsByProduct(id) {
    const productshop = await db.ProductShop.findAll({ where: { idproduct: id }, raw: true });
    const shop = [];
    for (var i = 0; i < productshop.length; i++)
        shop.push(await db.Shop.findOne({ where: { id: productshop[i].idshop } }));
    return shop;
}
async function GetShopPriceByProduct(id) {
    const product = await db.ProductShop.findAll({ where: { idproduct: id }, raw: true });
    const price = [];
    for (var i = 0; i < product.length; i++)
        price.push(product[i].price);
    return price;
}
async function ShopPriceUpdate(id) {
    db.ProductShop.update({ instokc: 1 }, { where: { id: id } });
    const prod = await db.ProductShop.findOne({ where: { id: id } });
    if (prod) {
        db.ProductShop.findAll({
            where: {
                idshop: prod.idshop, idproduct: prod.idproduct, id: {
                    [Op.not]:prod.id}
            }
        }).then((prod1) => {
            db.ProductShop.destroy({ where: { id: prod1[0].id } });
        });
    }
}
async function ShopPriceDelete(id) {
    db.ProductShop.destroy({ where: { id: id } });
}
async function AdminShopProduct() {
    return await db.sequelize.query("select ps.id,s.name shopname,s.address,p.name productname,u.login, ps.price from shops s,products p, product_shops ps, users u where p.id = ps.idproduct and s.id = ps.idshop and ps.instokc='false' and u.id = ps.iduser ;");
}
async function CreateRating(iduser, idshop, rating) {
    const rating1 = await db.Rating.findOne({ where: { iduser: iduser, idshop: idshop } })
    if (!rating1) {
        db.Rating.create({
            iduser: iduser,
            idshop: idshop,
            rating: rating
        }).then(res => {
            console.log(res);
            return true;
        }).catch(err => console.log(err));
    }
    else
    return false;
}
async function GetRaiting(idshop) {
    const rat = await db.Rating.findAll({ where: { idshop: idshop } });
    var i = 0;
    var ratingsum = 0;
    var rating;
    for (i; i < rat.length; i++) {
        ratingsum = Number(ratingsum) +  Number(rat[i].rating);
    }
    rating = ratingsum / i;
    return rating;
}
module.exports = {
    UserCreate, UserFindByLogin, ShopCreate, GetShops, ProductCreate, GetProducts,
    GetProductsByName, GetShopsByName, db, GetShopsByLocation, GetProductsByShop,
    GetProductsPriceByShop, GetShopsByProduct, GetShopPriceByProduct, ShopPriceUpdate,
    AdminShopProduct, CreateRating, GetRaiting, GetUsers, deleteUsers, ShopPriceDelete
}; 