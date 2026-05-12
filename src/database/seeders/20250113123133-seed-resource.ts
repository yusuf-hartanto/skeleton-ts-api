'use strict';

import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/parameter';
import { helper } from '../../helpers/helper';
import { ROLE_ADMIN } from '../../utils/constant';
import { initializeDatabase } from '../connection';
import { Op, QueryInterface, Sequelize } from 'sequelize';
import Model from '../../module/app/resource/resource.model';
import { initializeModels } from '../../module/models/models.index';
import { repository as repoArea } from '../../module/area/area.repository';
import { repository as repoRole } from '../../module/app/role/role.repository';

type Migration = (
  queryInterface: QueryInterface,
  sequelize: Sequelize
) => Promise<void>;
export const up: Migration = async () => {
  const dataConfig = await Config.initialize();
  const sequelize = await initializeDatabase(dataConfig?.database);
  initializeModels(sequelize);

  const password = await helper.hashIt('adminuser');
  const role = await repoRole.detail({
    role_name: { [Op.like]: `%${ROLE_ADMIN}%` },
  });
  const subdistrict = await repoArea.subdistrictDetail({
    name: { [Op.like]: '%JATIHANDAP%' },
  });
  await Model.bulkCreate([
    {
      resource_id: uuidv4(),
      role_id: role?.getDataValue('role_id'),
      username: 'adminuser',
      email: 'admin.user@yopmail.com',
      password: password,
      full_name: 'Super Admin',
      place_of_birth: 'Bandung',
      date_of_birth: helper.date(),
      usia: 1,
      telepon: '085722800025',
      status: 'A',
      area_province_id: subdistrict?.getDataValue('area_province_id'),
      area_regencies_id: subdistrict?.getDataValue('area_regencies_id'),
      area_district_id: subdistrict?.getDataValue('area_district_id'),
      area_subdistrict_id: subdistrict?.getDataValue('id'),
      created_by: '00000000-0000-0000-0000-000000000000',
    },
  ], {
    conflictAttributes: ['username'],
    updateOnDuplicate: [
      'role_id',
      'email',
      'password',
      'full_name',
      'place_of_birth',
      'date_of_birth',
      'usia',
      'telepon',
      'status',
      'area_province_id',
      'area_regencies_id',
      'area_district_id',
      'area_subdistrict_id',
      'created_by',
      'updated_at'
    ],
  });
};

export const down: Migration = async () => {
  await Model.destroy({ where: {}, truncate: true });
};
