
function setFocus(){if(!window.g_FocusId){return;}
var el=document.getElementById(window.g_FocusId);if(el){try{el.focus();}
catch(e){}}}

// import from the MyMSN9 dynamic.js
// general function for generating relative urls 
//REVIEW:  we have the same thing in page.relUrl, not public.  do we even need them?  implementation is no different than "/foo.armx"
function relativePath(path) {
	return "http://" + window.location.host + path;
}

var firstTime = true;
function openCal(arg, id) {
	window.inputId = "";
	var el = window.event.srcElement;

	if (!el) {
		return;
	}
	
	var pL = el.clientWidth + 1;
	var pT = el.clientHeight + 1;
	while (el.tagName != "BODY") {
		pT += el.offsetTop + el.clientTop;
		pL += el.offsetLeft + el.clientLeft;
		el = el.offsetParent;
	}
	var elIframe = document.getElementById("cal");
	if (elIframe !== null) {
		if(firstTime) {
			elIframe.src=relativePath("/calendar.armx");
			//make the Iframe a child of the body
			window.document.body.insertAdjacentElement("beforeEnd",elIframe);
		}
		window.inputId = id;
		elIframe.style.zIndex = 100;
		elIframe.style.position = "absolute";
		elIframe.style.left = pL;
		elIframe.style.top = pT;
		elIframe.style.display = "block";
		//work
		if(!firstTime) {
			document.frames("cal").document.links[0].focus();
		}
		firstTime = false;
		//dont work
		//document.frames("cal").document.body.focus();
	}
}