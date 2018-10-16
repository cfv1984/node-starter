import Sequelize from 'sequelize';
import getSequelize from '../../../src/model/sequelize';

const sql = getSequelize();

export const UserProfilesFields = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	email: Sequelize.TEXT,
	password: Sequelize.TEXT,
	salt: Sequelize.TEXT
};

const UserProfiles = sql.define('UserProfiles', UserProfilesFields);

export default UserProfiles;
