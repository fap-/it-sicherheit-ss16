function flash(movie, fallback, width, height) {
	var plugin;
	var ua = window.navigator.userAgent;
	var bFound = false;
	for(i=8; i > 3; i--) {
		eval('try{plugin = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);}catch(e){};');
		if(typeof(plugin) == "object") {
			document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="' + width + '" height="' + height + '"><param name="movie" value="' + movie + '" /><param name="quality" value="high" /><param name="wmode" value="transparent"/></object>');
			return;
		}
	}
	document.write('<img src="' + fallback + '" width="' + width + '" height="' + height + '" />');
}
