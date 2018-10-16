const Transform = require('jsx-templates-in-nodejs');

export default ({ params: { isParamFromURL }, tags }) => (
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta http-equiv="X-UA-Compatible" content="ie=edge" />
			<title>Node-starter</title>
		</head>
		<body>
			<h1>This is a starter project!</h1>
			<h2>
				Part of <code>cfv1984/node-starter</code>
			</h2>
			<p>
				Edit this file in <code>app/templates/Home.jsx</code>
			</p>
			<p>A parameter was passed: {isParamFromURL > 50}</p>
			<p>
				This was queried from the DB:
				<pre>
					<code>{JSON.stringify(tags)}</code>
				</pre>
			</p>
		</body>
	</html>
);
