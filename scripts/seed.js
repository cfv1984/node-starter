require('dotenv').config();
require('@babel/register');
const models = require('../app/models/posts/index').default;
const randomString = require('../src/util/randomString').default;
const salt = randomString(32);

models.sync().then(() => {
	models.Tags.create({ tag: 'Uncategorized' }).then(tag => {
		models.UserProfiles.create({
			email: process.env.ROOT_EMAIL,
			password: process.env.ROOT_PASSWORD,
			salt
		}).then(profile => {
			return models.Users.create({
				name: process.env.ROOT_USER,
				profile: profile.id
			}).then(user => {
				models.Posts.create({
					createdBy: user.id,
					title: 'First post!',
					body: 'First post body'
				});
			});
		});
	});
});
