const express = require('express');
const app = express();
const { applyRoutingPatterns } = require('./routing');
const { resources } = require('../app');

// remove the line below if you do not want / need to use the provided framework
applyRoutingPatterns(app, resources);

app.set('port', process.env.PORT || 1000);

app.use((_, res) => res.status(404).end('error'));

app.listen(app.get('port'), () =>
	console.log(`Running on port ${app.get('port')}!`)
);
