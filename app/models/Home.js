import Model from '../../src/model/Model';
import { CommonQueryOptions } from '../../src/model/sequelize';

export default class Home extends Model {
	constructor() {
		super();
	}
	getTags() {
		return this.db.query('SELECT * FROM Tags', CommonQueryOptions.SELECT);
	}
}
