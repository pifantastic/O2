
var EqVis = function(opts) {
	this.init(opts);
};

EqVis.prototype = {
	
	init: function(options) {
		if (typeof options == "string") {
			options = {element: options};
		}
		
		var defaults = {
			element: "",
			color: "#FFFFFF"
		};
		
		this.settings = $.extend(defaults, options);
		
		// Container element
		this.$element = $(options.element);
		
		if (this.$element.length === 0) {
			// Container element wasn't found, nothing to draw on!
			return;
		}
		
		// Default dimensions to the container's dimensions
		if (!this.settings.width) { this.settings.width = this.$element.width(); }
		if (!this.settings.height) { this.settings.height = this.$element.height(); }
		
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
	},
	
	update: function(bands) {
		// The width of each band, also known has bandwidth
		this.bandWidth = Math.floor(this.settings.width / bands.length);
		
		// Clear old rectangles, we never loved them anyway
		this.context.clearRect(0, 0, this.settings.width, this.settings.height);
		
		for (var x = 0; x < bands.length; x++) {
			// Calculate new rectangle amplitude
			var height = Math.round(bands[x] * this.settings.height);
			
			// Render new ractangle
			this.context.fillRect(x * this.bandWidth + 1, this.settings.height - height, this.bandWidth - 1, height);
		}
	}
	
};