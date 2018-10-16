import Sequelize, { QueryTypes as types } from 'sequelize';

const sequelizeInstance = new Sequelize(process.env.CONNECTION_STRING, {
	dialect: process.env.SQL_DIALECT
});

const getSequelize = () => sequelizeInstance;

export const QueryTypes = types;

export const CommonQueryOptions = {
	SELECT: {
		logging: process.env.NODE_ENV === 'production' ? () => {} : console.log,
		plain: false,
		raw: false,
		type: QueryTypes.SELECT
	}
};

export default getSequelize;
