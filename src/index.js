require('dotenv').config();

require('@babel/register', {
	cache: process.env.NODE_ENV === 'production'
});

require('./express');
