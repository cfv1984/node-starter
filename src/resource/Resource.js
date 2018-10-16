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

	render(resourceRenderCallback = noop) {
		return this.beforeRender(this)
			.then(
				() => this.view.render(),
				error => {
					throw error;
				}
			)
			.then(this.afterRender)
			.then(
				output => resourceRenderCallback(output),
				error => {
					throw error;
				}
			);
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
