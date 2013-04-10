(function() {

  Function.prototype.property = function(properties) {
    var descriptor, name;
    for (name in properties) {
      descriptor = properties[name];
      Object.defineProperty(this.prototype, name, descriptor);
    }
  };

}).call(this);
