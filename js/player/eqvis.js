
var EqVis = function(opts) {
	this.init(opts);
};

EqVis.prototype = {
	
	init: function(options) {
		if (typeof options == "string") {
			options = {element: options};
		}
		
		var defaults = {
			// Container element that the canvas will append to
			element: "",
			
			// Fill color for the EQ bars
			color: "#FFFFFF",
			
			// Visualization dimensions
			width: 1024,
			height: 100
		};
		
		this.settings = $.extend(defaults, options);
		
		this.initialized = false;
		
		$($.proxy(function() {
			// Container element
			this.$element = $(this.settings.element);
			
			if (this.$element.length === 0) {
				// Container element wasn't found
				return;
			}
			
			// Create canvas element in container and set dimensions
			this.canvas = $('<canvas></canvas>').appendTo(this.$element).get(0);
			this.canvas.height = this.settings.height;
			this.canvas.width = this.settings.width;
			
			// Canvas context
			this.context = this.canvas.getContext("2d");
			
			// Create gradient for fill style
			this.gradient = this.context.createLinearGradient(0, 0, 0, this.settings.height);
			this.gradient.addColorStop(0, this.settings.color);
			this.gradient.addColorStop(2, "rgba(0, 0, 0, 0)");
			
			this.context.fillStyle = this.gradient;
			
			// Document ready event has fired and the canvas is ready
			this.initialized = true;
		}, this));
	},
	
	update: function(e) {
		if (!this.initialized) { return; }
		
		// This width of each band
		this.bandWidth = Math.floor(this.settings.width / e.bands.length);
		
		this.context.clearRect(0, 0, this.settings.width, this.settings.height);
		
		for (var x = 0; x < e.bands.length; x++) {
			// Remove previous rectangle
			//this.context.clearRect(x * this.bandWidth, 0, this.bandWidth, this.settings.height);
			
			// Calculate new rectangle amplitude
			var height = Math.round(e.bands[x] * this.settings.height);
			
			// Render new ractangle
			this.context.fillRect(x * this.bandWidth + 1, this.settings.height - height, this.bandWidth - 1, height);
		}
	}
	
};