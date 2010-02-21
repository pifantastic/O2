// This file was automatically generated from base.soy.
// Please don't edit this file by hand.

if (typeof O2 == 'undefined') { var O2 = {}; }


O2.controls = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="controls"><a href="#/settings">settings</a>&nbsp;&nbsp;<a href="#/play">play</a>&nbsp;&nbsp;<a href="#/stop">stop</a><div id="song-progressbar"></div></div>');
  if (!opt_sb) return output.toString();
};


O2.library = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="library-wrapper"><h2>Library</h2><div id="library">');
  if (opt_data.songs) {
    output.append('<table>');
    var songList9 = opt_data.songs;
    var songListLen9 = songList9.length;
    for (var songIndex9 = 0; songIndex9 < songListLen9; songIndex9++) {
      var songData9 = songList9[songIndex9];
      output.append('<tr><td>', soy.$$escapeHtml(songData9.artist), '</td><td>', soy.$$escapeHtml(songData9.album), '</td><td><a href="#/load/', soy.$$escapeHtml(songData9.id), '">', soy.$$escapeHtml(songData9.title), '</a></td></tr>');
    }
    output.append('</table>');
  }
  output.append('</div></div>');
  if (!opt_sb) return output.toString();
};


O2.info = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="info-wrapper"><h2>Info</h2><div id="info">', (opt_data.song) ? '<table><tr><td>Title</td><td>' + soy.$$escapeHtml(opt_data.song.title) + '</td></tr><tr><td>Artist</td><td>' + soy.$$escapeHtml(opt_data.song.artist) + '</td></tr><tr><td>Album</td><td>' + soy.$$escapeHtml(opt_data.song.album) + '</td></tr><tr><td>Year</td><td>' + soy.$$escapeHtml(opt_data.song.year) + '</td></tr><tr><td>Track</td><td>' + soy.$$escapeHtml(opt_data.song.track) + '</td></tr></table>' : '', '</div></div>');
  if (!opt_sb) return output.toString();
};


O2.visualization = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="visualization"></div>');
  if (!opt_sb) return output.toString();
};


O2.settings = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div id="settings" style="display: none"><form action="" method="post" enctype="multipart/form-data"><label for="library-folders">Library Folders</label><textarea id="library-folders" rows="10" cols="40"></textarea><a href="#/scan">Scan library folders for new music</a><div id="scan-progressbar"></div></form></div>');
  if (!opt_sb) return output.toString();
};


O2.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t');
  O2.controls(opt_data, output);
  O2.library(opt_data, output);
  O2.info(opt_data, output);
  O2.visualization(opt_data, output);
  O2.settings(opt_data, output);
  if (!opt_sb) return output.toString();
};
