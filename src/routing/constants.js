export const Quantities = {
	SINGLE: 'SINGLE',
	MANY: 'MANY',
	PART: 'PART'
};

export const HTTPVerbs = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
	OPTIONS: 'OPTIONS'
};

export const ResourceVerbMappings = {
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

export const ExpressRouterMappings = {
	[HTTPVerbs.GET]: 'get',
	[HTTPVerbs.POST]: 'post',
	[HTTPVerbs.PUT]: 'put',
	[HTTPVerbs.PATCH]: 'patch',
	[HTTPVerbs.DELETE]: 'delete',
	[HTTPVerbs.OPTIONS]: 'options'
};
