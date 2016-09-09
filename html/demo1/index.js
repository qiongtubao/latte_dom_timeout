var latte_dom = latte.require("latte_dom");
var latte_lib = latte.require("latte_lib");
  var data = latte_lib.object.create({
    timeout :{
      time: 3000,
      run: 0,
      t: "",
      timeout: function(time) {
        this.set("t", parseInt(time/60) +":"+ (time%60) );
      }
    },
    start: function() {
      this.set("timeout.run", 1);
      console.log(this);
    },
    stop: function() {
      this.set("timeout.run", 0);
    }

  });
  var box = latte_dom.define("demo", data);
  console.log(data);