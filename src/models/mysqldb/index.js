const { Sequelize, Op } = require('sequelize');
const config = require('../../config/config')


const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    logging: config.env === 'development',
})

/**
 * Impotent function plz do not used ture function
 *
 * ture  = auto table and clear all data
 * false = auto gen table but will not clear database
 */
sequelize.sync({ force: false })

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    op: Op,
    
    user: require('./user.model')(sequelize, Sequelize)
};
