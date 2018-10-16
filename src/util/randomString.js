const randomString = (length = 96) => {
	const dict =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz0123456789_!.';
	const pickRandomLetter = () =>
		dict[Math.floor(Math.random() * dict.length - 1)];
	return Array(length)
		.fill(pickRandomLetter)
		.map(l => l())
		.join('');
};

export default randomString;
