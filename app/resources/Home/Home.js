import Resource from '../../../src/resource/Resource';
import Model from '../../models/Home';
import View from '../../views/Home';
import UserProfiles from '../../models/Posts/UserProfiles';
import Users from '../../models/Posts/Users';
import randomString from '../../../src/util/randomString';
import hash from '../../../src/util/hash';

export default class Home extends Resource {
	constructor(vars = {}) {
		super(new Model(), new View());
		this.view.vars.params = vars.params;
	}
	render(cb) {
		this.model.getTags().then(tags => {
			this.view.vars.tags = tags;
			return super.render(cb);
		});
	}
}
