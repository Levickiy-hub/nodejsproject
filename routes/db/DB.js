const db = require('./DBConfig');




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
function ShopCreate(name, address,info) {
    db.Shop.create({
        name: name,
        address: address,
        info:info
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
async function ProductCreate(name, description, price, idshop) {
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
                price: price
            }).then(res => {
                console.log(res);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    } else {
        db.ProductShop.create({
            idproduct: prod.id,
            idshop: idshop,
            price: price
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
    const product = await db.Product.findAll({ where: { name: name }, raw: true });
    return product;
}
module.exports = {
    UserCreate, UserFindByLogin, ShopCreate, GetShops, ProductCreate, GetProducts,
    GetProductsByName, GetShopsByName, db
}; 