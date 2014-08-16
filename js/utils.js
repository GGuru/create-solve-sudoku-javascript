var utils = (function () {
	  return {	  
		randomNumber: function(to, from) {
			return Math.floor(Math.random() * (to - from + 1) + from);
		}
	  }
})();
