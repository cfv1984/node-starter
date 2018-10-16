import Model from '../../src/model/Model';
import Posts from './Posts/Posts';

export default class Posts extends Model {
	getTags() {
		return this.db.query('SELECT * FROM TAGS', CommonQueryOptions.SELECT);
	}
	getPost(id) {
		return Posts.findById(id);
	}
	getPosts() {
		return Posts.findAll();
	}
}
