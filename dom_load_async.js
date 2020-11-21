/* dom content loaded <async script> */
"use strict";
log('-----------')
log('SCRIPT: Loading DOM Content - <async script>') // log already declared in previous script.

function logId(element) {
	log(element.id)
}

/* if we try to just get the element like this, we are hoping that 
 the browser has loaded the #myId element by the time this script has
 finished downloading. It likely has (since it is a small page), so it will work,
 but you might not want to rely on that always being true. 
*/
// const element = document.querySelector('#myId')
// logId(element)

/* So instead, we can take advantage of downloading scripts while the DOM is being built,
   but also ensure the whole DOM is built by making a modification to our event listener
   for DOMContentLoaded.
*/
// Since the <async script> might execute *after* DOMContentLoaded, we have two cases two consider.
function AsyncDOMLoaded(callback) {
	if (document.readyState === 'loading') { 
		// 1. The DOM is still loading, so start the usual event listener.
		document.addEventListener("DOMContentLoaded", callback);
	} else {
		// 2. The DOM has already loaded, so just run the callback function immediately.
		callback()
	}
};

// takes the callback function as its argument
AsyncDOMLoaded(function() {
	log('async script: The DOM has loaded - running the callback.')
	logId(document.querySelector('#myId'))
});

