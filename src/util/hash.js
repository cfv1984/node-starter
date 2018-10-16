import crypto from 'crypto';

const hash = (str, salt) => {
	const hash = crypto.createHash('sha256');
	const hmac = crypto.createHmac('sha256', process.env.INSTANCE_KEY);
	hash.update(str + salt);
	hmac.update(hash.digest('hex'));

	return hmac.digest('hex');
};

export default hash;
