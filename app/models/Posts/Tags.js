import getSequelize from '../../../src/model/sequelize';
import Sequelize from 'sequelize';

const sql = getSequelize();

export const TagsFields = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tag: Sequelize.TEXT
};

const TagsModel = sql.define('Tags', TagsFields);

export default TagsModel;
