'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('app_param_global', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    param_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    param_value: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    param_desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type_menu: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  await queryInterface.addConstraint('app_param_global', {
    fields: ['param_key', 'param_value'],
    type: 'unique',
    name: 'unique_param_key_value',
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('app_param_global');
  try {
    await queryInterface.sequelize.query(
      'DROP CONSTRAINT IF EXISTS "unique_param_key_value";'
    );
  } catch (e) {}
};
