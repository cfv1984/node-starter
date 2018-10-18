const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const here = __dirname;
const pathToLocalEnv = path.resolve(here, '../env.local');
const pathToEnv = path.resolve(here, '../.env');

const randomString = (len) => crypto.randomBytes(len).toString('hex')

const env = fs
	.readFileSync(pathToLocalEnv)
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
