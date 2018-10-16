const express = require('express');
const app = express();

const { resources } = require('../app');

Object.keys(resources).forEach(dict => {
	Object.keys(resources[dict]).forEach(route => {
		app[dict.toLowerCase()](route, (req, res) => {
			const resource = new resources[dict][route]({
				params: {
					...req.query,
					...(req.params || {})
				}
			});
			resource.render(output => {
				res.set(resource.headers);
				res.status(resource.status).end(output);
			});
		});
	});
});

app.set('port', process.env.PORT || 3000);

app.use((_, res) => res.status(404).end('error'));

app.listen(app.get('port'), () =>
	console.log(`Running on port ${app.get('port')}!`)
);
