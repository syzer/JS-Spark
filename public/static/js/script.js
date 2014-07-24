/* Author: YOUR NAME HERE
*/

(function() {

	var ioClient = io.connect();

	ioClient.on('task', function (serializedTask) {
		console.log(serializedTask);
		var task,
			response;
		try {
			task = JSON.parse(serializedTask, functionCreate);
			response = task.execute(_, task.data, task.callbacks).value();

		} catch (e) {
			console.log(e.toString());
		}
		ioClient.emit('response', response.toString());
		console.log('Client response', response);
	});

	// CSP may block Function call, function used not to use eval
	function functionCreate(key, value) {

		if (!key) {
			return value;
		}

		if ('string' === typeof value) {
			var funcRegExp = /function[^\(]*\(([^\)]*)\)[^\{]*{([^\}]*)\}/,
				match = value.match(funcRegExp);
			if (match) {
				var args = match[1]
					.split(',')
					.map(function (arg) {
						return arg.replace(/\s+/, '');
					});
				return new Function(args, match[2]);
			}
		}
		return value;
	}

})();
