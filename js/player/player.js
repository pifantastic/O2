

var MediaPlayer = function(opts) {
	this.init(opts);
}
 
MediaPlayer.prototype = {
	
	init: function(options) {
		this.defaults = {
			music_library: ""
		}
		
		this.settings = $.extend(this.defaults, options);
		
		this.loaded_song;
		this.playing_song;
		this.sound = new air.Sound();
		this.channel;
		this.position = 0;
		this.interval;
		
		this.events = {
			"progress": [],
			"start": [],
			"stop": [],
			"end": []
		};
	},
	
	load: function(file, onID3InfoReceived) {
		// Load metadeta for this song
		var sound = new air.Sound();
		if ($.isFunction(onID3InfoReceived)) {
			sound.addEventListener(air.Event.ID3, function(e) {
				// Execute callback with id3 information
				onID3InfoReceived({
					title: e.target.id3['TIT2'],
					artist: e.target.id3['TPE1'],
					album: e.target.id3['TALB'],
					year: e.target.id3['TYER'],
					track: e.target.id3['TRCK'],
					path: file
				});
			});
		}
		
		this.loaded_song = file;
		try {
			sound.load(this.urlRequest(this.loaded_song));
		} catch(e) {
			log("Error loading sound!", e);
		}
	},
	
	// Mac OSX needs "file:///" prepended to urls for them to properly load
	urlRequest: function(url) {
		if (air.Capabilities.os.indexOf("Mac OS") > -1) {
			url = "file://" + url;
		}
		return new air.URLRequest(url);
	},
	
	play: function() {
		// Are we playing a new song are restarting the old one?
		if (this.loaded_song !== this.playing_song) {
			
			// Stop song if its playing
			this.stop();
			
			// Reset position
			this.position = 0;
			
			// Close current sound if its still open
			try {
				this.sound.close();
			} catch(e) {}
			
			// Load new song
			this.sound = new air.Sound();
			this.sound.load(this.urlRequest(this.loaded_song));
		}
		
		if (this.sound) {
			this.run("start");
			
			// Play song
			this.channel = this.sound.play(this.position);
			this.playing_song = this.loaded_song;
			
			// Progress event
			this.interval = setInterval($.proxy(this.playbackProgress, this), 100);
			
			// Song end event
			this.sound.addEventListener(air.Event.SOUND_COMPLETE, $.proxy(this.playbackComplete, this));
		}
	},
	
	stop: function() {
		// Make sure there is a song to be stopped
		if (this.channel) {
			// Save current position so we can start where we left off
			this.position = this.channel.position;
			
			// Stop song
			this.channel.stop();
			
			this.run("stop");
		}
	},
	
	playbackProgress: function() {
		// Length estimation based on how much we've downloaded
		var estimatedLength = Math.ceil(this.sound.length / (this.sound.bytesLoaded / this.sound.bytesTotal));
		
		// Percent complete
		var playbackPercent = Math.round(100 * (this.channel.position / estimatedLength));
		
		// Frequency spectrum (256 bands)
		var bytes = new air.ByteArray();
		air.SoundMixer.computeSpectrum(bytes, true, 0);
		var bands = [];
		for (var x = 0; x < 256; x++) {
			bytes.position = x * 4;
			bands[x] = Math.abs(bytes.readFloat());
		}
		
		this.run("progress", {
			position: this.channel.position, 
			length: estimatedLength, 
			percent: playbackPercent,
			bands: bands
		});
	},
	
	playbackComplete: function() {
		clearInterval(this.interval);
		this.run("end");
	},
	
	bind: function(event, callback) {
		if (this.events.hasOwnProperty(event)) {
			this.events[event].push(callback);
		}
	},
	
	run: function(event, context) {
		if (!this.events.hasOwnProperty(event)) { return; }
		
		context = context || {};
		for (var x = 0; x < this.events[event].length; x++) {
			this.events[event][x](context);
		}
	}
	
};