const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const store = sequelize.define('store', {
    store_id: {
      autoIncrement: true,
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    manager_staff_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      },
      unique: "fk_store_staff"
    },
    address_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id'
      }
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'store',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "idx_unique_manager",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "manager_staff_id" },
        ]
      },
      {
        name: "idx_fk_address_id",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
    ]
  });

  store.associate = function (models) {
    store.hasMany(models.Staff, { as: "StoreStaff", foreignKey: "store_id" });
    store.hasMany(models.Customer, { as: "Customer", foreignKey: "store_id" });
    store.hasMany(models.Inventory, { as: "Inventory", foreignKey: "store_id" });
    store.belongsTo(models.Address, { as: "Address", foreignKey: "address_id" });
    store.belongsTo(models.Staff, { as: "Staff", foreignKey: "staff_id" });
    
  }
  return store
};
