(function() {
	/**
		倒计时功能的
		setTimeout的并不精确
	*/
	var timers = {};
	(function(){
		this.funcs = [];
		this.add = function(fn) {
			if(this.funcs.indexOf(fn) != -1) {return;}
			this.funcs.push(fn);
			if(this.funcs.length == 1) {this.doTime();}
			console.error("running timer number:"+this.funcs.length);
		}
		this.remove = function(fn) {
			var index = this.funcs
			if(index != -1) {
				this.funcs.splice(index, 1);
			}
			if(this.funcs.length == 0 && this.timer) {
				clearTimeout(this.timer);
			}
		}
		
		this.doTime = function() {
			var self = this;
			var doIt  = function() {
				var time = new Date();
				self.funcs.forEach(function(fun) {
					fun();
				});
				self.doTime();	
			}
			this.timer = setTimeout(doIt, 1000);
		}
	}).call(timers);
	this.create = function(data, dom, controller) {
		var func = dom.attr("latte-timeout-func");
		//data.get("run", false);
		var time = +dom.attr("latte-timeout-data");
		var timer ;
		var change = function(value, old) {
			if(value === old) {
				return;
			}
			if(value) {
				if(timer) {
					timers.add(timer);
					return;
				}
				timer = function() {
					var time = +data.get("time");
					var callback = data.get(func);
					if(--time <= 0) {
						timers.remove(timer);
						callback.call(data, 0);
					}else{
						callback.call(data, time);
					}
					data.set("time", time);
				}
				timers.add(timer);
			}else{
				if(timer) {
					timers.remove(timer);
				}
			}
		};
		change(data.get("run"));
		controller.bind( "data","run", change);
		controller.on("close", function() {
			if(timer) {
				timers.remove(timer);
				timer = null;
			}
		});
	}
}).call(module.exports);