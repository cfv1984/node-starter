import getSequelize from '../../../src/model/sequelize';
import Users from './Users';
import Sequelize from 'sequelize';

const sql = getSequelize();

const PostsFields = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	createdAt: Sequelize.DATE,
	modifiedAt: Sequelize.DATE,
	createdBy: {
		type: Sequelize.INTEGER,
		references: {
			model: Users,
			key: 'id'
		}
	},
	title: Sequelize.TEXT,
	body: Sequelize.TEXT
};

const Posts = sql.define('Posts', PostsFields);

export default Posts;
