import noop from '../util/noop';

export default class Resource {
	get headers() {
		return this.view.headers;
	}

	get status() {
		return this.view.status;
	}

	constructor(model, view) {
		if (!model) {
			throw new Error('Resources must be provided a data model');
		}
		if (!view) {
			throw new Error('Resources must be provided a view to render');
		}

		this.model = model;
		this.view = view;
	}

	beforeRender = resource => {
		return this.model.setup().then(
			() => Promise.resolve(resource),
			error => {
				throw error;
			}
		);
	};

	afterRender = viewOutput => {
		return this.model.tearDown().then(
			() => viewOutput,
			error => {
				throw error;
			}
		);
	};
}
