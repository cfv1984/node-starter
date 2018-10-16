import Sequelize from 'sequelize';
import getSequelize from '../../../src/model/sequelize';
import UserProfiles from './UserProfiles';

const sql = getSequelize();

export const UsersFields = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.TEXT,
	userProfile: {
		type: Sequelize.INTEGER,
		references: {
			model: UserProfiles,
			key: 'id'
		}
	}
};

const Users = sql.define('Users', UsersFields);

export default Users;
