const { Sequelize } = require('sequelize');
const { HOSTDATABASE, NAMEDATABASE, PASSWORDDATABASE, USERDATABASE, PORTDATABASE, URIDATEBASE } = require('../keys');

let sequelize;

if (URIDATEBASE) {
    sequelize = new Sequelize(URIDATEBASE, {
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        pool: {
            max: 20,
            min: 5,
            acquire: 30000,
            idle: 10000
        },
        logging: false,
    });
} else {
    sequelize = new Sequelize(NAMEDATABASE, USERDATABASE, PASSWORDDATABASE, {
        host: HOSTDATABASE,
        port: PORTDATABASE,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        pool: {
            max: 20,
            min: 5,
            acquire: 30000,
            idle: 10000
        },
        logging: false,
    });
}

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

const syngOptions = process.env.NODE_ENV === 'development' ? { force: true } : { alter: true };

sequelize.sync(syngOptions)
    .then(() => {
        console.log('Sincronización de la base de datos completada.');
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });


//! Importar modelos
const userModel = require('../model/user');
const rolModel = require('../model/roles');
//-appoint models
const appointmentModel = require('../model/appointment');
const appointmentStatusModel = require('../model/appointment-status');
const appointmentTypeModel = require('../model/appointment-logs');
//- pet models
const petsModel = require('../model/pets');
const petTypeModel = require('../model/petTypes');
const petNoteModel = require('../model/petNotes');
//- product models
const productModel = require('../model/products');
const productCategoryModel = require('../model/product-category');
const productTypeModel = require('../model/products-type');
//- service models
const serviceModel = require('../model/service');
const serviceCategoryModel = require('../model/serviceCategory');
const serviceTypeModel = require('../model/servicePetType');

//! Asociar modelos
const users = userModel(sequelize, Sequelize);
const rol = rolModel(sequelize, Sequelize);
//-appoint models
const appointment = appointmentModel(sequelize, Sequelize);
const appointmentStatus = appointmentStatusModel(sequelize, Sequelize);
const appointmentType = appointmentTypeModel(sequelize, Sequelize);
//- pet models
const pets = petsModel(sequelize, Sequelize);
const petType = petTypeModel(sequelize, Sequelize);
const petNote = petNoteModel(sequelize, Sequelize);
//- product models
const products = productModel(sequelize, Sequelize);
const productCategory = productCategoryModel(sequelize, Sequelize);
const productType = productTypeModel(sequelize, Sequelize);
//- service models
const service = serviceModel(sequelize, Sequelize);
const serviceCategory = serviceCategoryModel(sequelize, Sequelize);
const serviceType = serviceTypeModel(sequelize, Sequelize);

//! relaciones

// Relaciones de Users
users.belongsTo(rol, { foreignKey: 'rol_id' });
users.hasMany(pets, { foreignKey: 'user_id' });
users.hasMany(appointment, { foreignKey: 'user_id' });

// Relaciones de Pets
pets.belongsTo(petType, { foreignKey: 'type_id' });
pets.belongsTo(users, { foreignKey: 'user_id' });
pets.hasMany(petNote, { foreignKey: 'pet_id' });
petNote.belongsTo(pets, { foreignKey: 'pet_id' }); // Relación inversa faltante

// Relaciones de PetType
petType.hasMany(pets, { foreignKey: 'type_id' });
petType.hasMany(serviceType, { foreignKey: 'pet_type_id' });
petType.hasMany(productType, { foreignKey: 'pet_type_id' });

// Relaciones de Products
products.belongsTo(productCategory, { foreignKey: 'category_id' });
products.hasMany(productType, { foreignKey: 'product_id' });
productCategory.hasMany(products, { foreignKey: 'category_id' });

// Relaciones de ProductType
productType.belongsTo(products, { foreignKey: 'product_id' });
productType.belongsTo(petType, { foreignKey: 'pet_type_id' }); // Corregido de pet_id a pet_type_id

// Relaciones de Appointment
appointment.belongsTo(users, { foreignKey: 'user_id' });
appointment.belongsTo(pets, { foreignKey: 'pet_id' });
appointment.belongsTo(service, { foreignKey: 'service_id' }); // Eliminada relación duplicada
appointment.belongsTo(appointmentStatus, { foreignKey: 'status_id' });

// Relaciones de Service
service.belongsTo(serviceCategory, { foreignKey: 'category_id' });
service.hasMany(serviceType, { foreignKey: 'service_id' });
service.hasMany(appointment, { foreignKey: 'service_id' });

// Relaciones de ServiceType
serviceType.belongsTo(service, { foreignKey: 'service_id' });
serviceType.belongsTo(petType, { foreignKey: 'pet_type_id' });

module.exports = {
    users,
    rol,
    appointment,
    appointmentStatus,
    appointmentType,
    pets,
    petType,
    petNote,
    products,
    productCategory,
    productType,
    service,
    serviceCategory,
    serviceType
};