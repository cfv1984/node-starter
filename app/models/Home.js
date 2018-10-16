import Model from '../../src/model/Model';
import Tags from './Posts/Tags';
export default class Home extends Model {
	constructor() {
		super();
	}
	getTags() {
		return Tags.findAll();
	}
}
