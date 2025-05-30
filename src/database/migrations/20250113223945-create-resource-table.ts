'use strict';

import { QueryInterface } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.sequelize.query(`
    CREATE TABLE app_resource (
      resource_id varchar(50) NOT NULL,
      role_id varchar(50) DEFAULT NULL,
      username varchar(100) DEFAULT NULL,
      email varchar(255) DEFAULT NULL,
      password varchar(255) DEFAULT NULL,
      full_name varchar(255) DEFAULT NULL,
      place_of_birth varchar(255) DEFAULT NULL,
      date_of_birth date DEFAULT NULL,
      usia int DEFAULT 0,
      telepon varchar(100) DEFAULT NULL,
      image_foto varchar(255) DEFAULT NULL,
      status varchar(3) DEFAULT NULL,
      total_login int DEFAULT 0,
      area_province_id varchar(50) DEFAULT NULL,
      area_regencies_id varchar(50) DEFAULT NULL,
      confirm_hash varchar(255) DEFAULT NULL,
      token text DEFAULT NULL,
      token_expired timestamp DEFAULT NULL,
      created_by varchar(50) DEFAULT NULL,
      created_date timestamp DEFAULT NULL,
      modified_by varchar(50) DEFAULT NULL,
      modified_date timestamp DEFAULT NULL,
      PRIMARY KEY (resource_id),
      UNIQUE (resource_id,username,email)
    );
  `);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.sequelize.query(`DROP TABLE IF EXISTS app_resource;`);
};
