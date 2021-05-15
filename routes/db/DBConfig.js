const Sequelize = require('sequelize');
const sequelize = new Sequelize('NodejsProject', 'postgres', 'Admin12345', {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    logging: false
});


const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});
sequelize.sync().then(/*result => console.log(result)*/)
    .catch(err => console.log(err));

const Shop = sequelize.define("shop", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address:{
        type: Sequelize.STRING,
        allowNull: null
    },
    info: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
sequelize.sync().then(/*result => console.log(result)*/)
    .catch(err => console.log(err));
const ProductShop = sequelize.define("product_shop", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    idshop: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idproduct: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }

});
sequelize.sync().then(/*result => console.log(result)*/)
    .catch(err => console.log(err));
const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
sequelize.sync().then(/*result => console.log(result)*/)
    .catch(err => console.log(err));


module.exports = {
    sequelize, User, Shop, Product, ProductShop
};