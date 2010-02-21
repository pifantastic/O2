// This file was automatically generated from base.soy.
// Please don't edit this file by hand.

if (typeof O2 == 'undefined') { var O2 = {}; }


O2.controls = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="controls"><a id="controls-settings" href="#">settings</a>&nbsp;&nbsp;<a id="controls-play" href="#">play</a>&nbsp;&nbsp;<a id="controls-stop" href="#">stop</a><div id="controls-progressbar"></div></div>');
  if (!opt_sb) return output.toString();
};


O2.library = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="library-wrapper"><div id="library">');
  if (opt_data.songs) {
    output.append('<table>');
    var songList9 = opt_data.songs;
    var songListLen9 = songList9.length;
    for (var songIndex9 = 0; songIndex9 < songListLen9; songIndex9++) {
      var songData9 = songList9[songIndex9];
      output.append('<tr id="song-', soy.$$escapeHtml(songData9.id), '"><td>', soy.$$escapeHtml(songData9.artist), '</td><td>', soy.$$escapeHtml(songData9.album), '</td><td>', soy.$$escapeHtml(songData9.songName), '</td></tr>');
    }
    output.append('</table>');
  }
  output.append('</div></div>');
  if (!opt_sb) return output.toString();
};


O2.info = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="info-wrapper"><div id="info">', (opt_data.song) ? '<table><tr><td>Title</td><td>' + soy.$$escapeHtml(opt_data.song.songName) + '</td></tr><tr><td>Artist</td><td>' + soy.$$escapeHtml(opt_data.song.artist) + '</td></tr><tr><td>Album</td><td>' + soy.$$escapeHtml(opt_data.song.album) + '</td></tr><tr><td>Year</td><td>' + soy.$$escapeHtml(opt_data.song.year) + '</td></tr><tr><td>Track</td><td>' + soy.$$escapeHtml(opt_data.song.track) + '</td></tr></table>' : '', '</div></div>');
  if (!opt_sb) return output.toString();
};


O2.visualization = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="visualization"></div>');
  if (!opt_sb) return output.toString();
};


O2.settings = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="settings" style="display: none"><label for="library-folders">Library Folders</label><textarea id="library-folders" rows="10" cols="40"></textarea><a id="settings-scan" href="#">Scan library folders for new music</a><div id="scan-progressbar"></div></div>');
  if (!opt_sb) return output.toString();
};


O2.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  O2.controls(null, output);
  O2.info(opt_data, output);
  O2.visualization(null, output);
  O2.library(opt_data, output);
  O2.settings(null, output);
  if (!opt_sb) return output.toString();
};
