'use strict';

import { v4 as uuidv4 } from 'uuid';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class AppMenu extends Model {
  declare menu_id: string;
  declare menu_name: string;
  declare menu_icon: string;
  declare module_name: string;
  declare type_menu: string;
  declare seq_number: number;
  declare parent_id: string;
  declare status: number;
  declare created_by: string;
  declare updated_by: string;
}

export function initAppMenu(sequelize: Sequelize) {
  AppMenu.init(
    {
      menu_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      menu_name: {
        type: DataTypes.STRING,
        unique: true,
      },
      menu_icon: {
        type: DataTypes.STRING,
      },
      module_name: {
        type: DataTypes.STRING,
      },
      type_menu: {
        type: DataTypes.STRING(1),
      },
      seq_number: {
        type: DataTypes.TINYINT,
      },
      parent_id: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.TINYINT,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'AppMenu',
      tableName: 'app_menu',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  AppMenu.beforeCreate((app_menu) => {
    app_menu?.setDataValue('menu_id', uuidv4());
  });
  return AppMenu;
}

export function associateAppMenu() {}

export default AppMenu;
