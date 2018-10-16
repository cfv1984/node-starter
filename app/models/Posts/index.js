import getSequelize from '../../../src/model/sequelize';
import Posts from './Posts';
import Tags from './Tags';
import UserProfiles from './UserProfiles';
import Users from './Users';

const force = { force: true };

const Repositories = {
	Posts,
	Tags,
	UserProfiles,
	Users,
	sync: () => {
		return Tags.sync(force)
			.then(() => Posts.sync(force))
			.then(() => UserProfiles.sync(force))
			.then(() => Users.sync(force));
	}
};

export default Repositories;
