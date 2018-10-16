import noop from '../util/noop';
import { Renderer } from 'jsx-templates-in-nodejs';

export default class View {
	vars = {};
	headers = {};
	status = 200;
	template = undefined;

	constructor(template, initialVars = {}) {
		if (!template) {
			throw new Error('A view musts have an associated template');
		}
		this.template = template;
		this.vars = {
			...initialVars
		};
	}

	render() {
		return this.beforeRender()
			.then(() => Renderer(this.template(this.vars), { shouldFormat: true }))
			.then(
				markup => this.afterRender(markup),
				error => {
					throw error;
				}
			);
	}

	setHeader(name, value) {
		this.headers[name] = value;
	}

	setHeaders(headerMap) {
		this.headers = {
			...this.headers,
			...headerMap
		};
	}

	beforeRender = () => Promise.resolve(this);
	afterRender = markup => Promise.resolve(markup);
}
