const here = __dirname;
const path = require('path');
const fs = require('fs');
const randomString = require('../src/util/randomString');
const pathToEnv = path.resolve(here, '../.env');

const env = fs
	.readFileSync(pathToEnv)
	.toString()
	.split(/\n/)
	.reduce((all, current) => {
		let line = current.trim();
		const IS_SENSITIVE = line.includes('PASSWORD') || line.includes('KEY');
		const IS_BLANK = line.slice(-1) === '=';
		if (IS_SENSITIVE && IS_BLANK) {
			line = line += randomString(96);
		}
		return (all += `\n${line}`);
	}, '');

fs.writeFileSync(pathToEnv, env);

process.exit(0);
