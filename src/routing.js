const canRespondTo = (handler, action) =>
	handler.prototype && handler.prototype.hasOwnProperty(action);

const respond = (resource, response, markup) => {
	response.set(resource.headers);
	response.status(resource.status).end(markup);
};

const stepFailed = e => {
	throw e;
};

const Quantities = {
	SINGLE: 'SINGLE',
	MANY: 'MANY',
	PART: 'PART'
};

const HTTPVerbs = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
	OPTIONS: 'OPTIONS'
};

const ResourceVerbMappings = {
	[HTTPVerbs.GET]: {
		[Quantities.SINGLE]: 'detail',
		[Quantities.MANY]: 'list'
	},
	[HTTPVerbs.POST]: {
		[Quantities.MANY]: 'create'
	},
	[HTTPVerbs.PUT]: 'replace',
	[HTTPVerbs.PATCH]: 'patch',
	[HTTPVerbs.DELETE]: 'remove',
	[HTTPVerbs.OPTIONS]: {
		[Quantities.SINGLE]: 'explain',
		[Quantities.MANY]: 'explain'
	}
};

const ExpressRouterMappings = {
	[HTTPVerbs.GET]: 'get',
	[HTTPVerbs.POST]: 'post',
	[HTTPVerbs.PUT]: 'put',
	[HTTPVerbs.PATCH]: 'patch',
	[HTTPVerbs.DELETE]: 'delete',
	[HTTPVerbs.OPTIONS]: 'options'
};

const urlForQuantity = (resource, quantity) =>
	quantity === Quantities.SINGLE ? `${resource}/:id/:stub?` : resource;

const handleByProxy = (handler, callable) => {
	return (req, res) => {
		const params = { ...req.query, ...(req.params || {}) };
		const resource = new handler({ params });
		const result = resource[callable].call(resource, params);
		let step;

		if (result instanceof Promise) {
			step = result.then(() => resource.beforeRender(resource), stepFailed);
		} else {
			step = resource.beforeRender(resource);
		}

		step
			.then(res => res.view.render(), stepFailed)
			.then(output => resource.afterRender(output), stepFailed)
			.then(markup => respond(resource, res, markup), stepFailed);
	};
};

const routeAppTo = (app, method, url, handler) =>
	app[ExpressRouterMappings[method]](url, handler);

export const getPatternApplier = (app, resources) => {
	return resource => {
		const handler = resources[resource];

		Object.keys(ResourceVerbMappings).forEach(verb => {
			const mapping = ResourceVerbMappings[verb];

			if (mapping.constructor !== String) {
				Object.keys(ResourceVerbMappings[verb]).forEach(qty => {
					console.log('applying mapping to', mapping);
					if (canRespondTo(handler, ResourceVerbMappings[verb][qty])) {
						routeAppTo(
							app,
							verb,
							urlForQuantity(resource, qty),
							handleByProxy(handler, ResourceVerbMappings[verb][qty])
						);
					}
				});
			} else {
				if (canRespondTo(handler, ResourceVerbMappings[verb])) {
					console.log('applying mapping to', mapping);
					routeAppTo(
						app,
						verb,
						urlForQuantity(resource, Quantities.SINGLE),
						handleByProxy(handler, ResourceVerbMappings[verb])
					);
				}
			}
		});
	};
};

export const applyRoutingPatterns = (app, resources) => {
	Object.keys(resources).forEach(getPatternApplier(app, resources));
};
