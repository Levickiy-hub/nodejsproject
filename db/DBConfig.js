const Sequelize = require('sequelize');
const sequelize = new Sequelize('d1gufo17fe9uis', 'csyluhdtxqhnzr', '90db4952ac801f2d7be8ef737f10b24981a0350a7c2ece8c319b4c9c1175ebc2', {
    dialect: 'postgres',
    host: 'ec2-54-216-48-43.eu-west-1.compute.amazonaws.com',
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
sequelize.sync().then()
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
    locationX: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    locationY: {
        type: Sequelize.FLOAT,
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
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    instokc: {
        type: Sequelize.BOOLEAN,
        allowNull: true
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
const Rating = sequelize.define("rating", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
   idshop: {
       type: Sequelize.INTEGER,
       allowNull: false
    },
    rating: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
sequelize.sync().then(result => console.log(result))
    .catch(err => console.log(err));


module.exports = {
    sequelize, User, Shop, Product, ProductShop, Rating
};