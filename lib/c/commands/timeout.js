(function() {
	this.before = function(data, dom, controller) {
		var type = dom.attr("latte-timeout");
		if(type) {
			var handle;
			try {
				handle = require("./timeouts/"+type+".js");
			}catch(e) {
				console.log(e);
				return;
			}
			handle.create(data, dom, controller);
		}

	}
}).call(module.exports);