module.exports = (sequelize, {STRING, BOOLEAN}) => {  // define tb_user
    return sequelize.define("tb_user", {
        title: {
          type: STRING
        },
        description: {
          type: STRING
        },
        published: {
          type: BOOLEAN
        }
      }, {
          freezeTableName: true,
      });;
  };