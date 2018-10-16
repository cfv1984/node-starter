import getSequelize from './sequelize';

export default class Model {
	get db() {
		return getSequelize();
	}

	setup() {
		return Promise.resolve(this);
	}
	tearDown() {
		return Promise.resolve(this);
	}
}
