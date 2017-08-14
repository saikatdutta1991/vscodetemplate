window.classie = {};

//this method checks a element has specified class or not
window.classie.hasClass = function(element, className)
{
	if(element.classList) {
		return element.classList.contains(className);
	} else {
		return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
	}
}


//this method add a class to an element
window.classie.addClass = function(element, className)
{
	if(element.classList) {
		element.classList.add(className);
	} else if(!hasClass(element, className)) {
		element.className += " " + className	
	} 
}


// this method removes class from a element
window.classie.removeClass = function(element, className) 
{
  	if (element.classList) {
  		element.classList.remove(className)
  	
  	} else if(window.classie.hasClass(element, className)) {
    
    	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    	element.className = element.className.replace(reg, ' ')
  	}
}


window.directoryList = {};
window.directoryList.dClickListener = function(event) 
{
	var directory = event.target.parentElement.parentElement;
	console.log(directory);

	if(window.classie.hasClass(directory, 'directory-open')) {
		window.classie.removeClass(directory, 'directory-open')
	} else {
		window.classie.addClass(directory, 'directory-open');
	}

}



window.onload = function()
{
	
	var directoryLits = document.querySelectorAll('.directory-list > .directory > .directory-item > .icon');

	Array.from(directoryLits).forEach(function(btnIcon, index, array) {

	/*	console.log(btnIcon);*/

		btnIcon.addEventListener("click", window.directoryList.dClickListener);

	});


}



/* resizeabe div */

window.makeHorizontalResizeable = function(eName, minWidth)
{
	var resizeabeElement = document.querySelectorAll(eName);

	if(!resizeabeElement.length) return;

	resizeabeElement = resizeabeElement[0];

	resizeabeElement.innerHTML += '<span class="drag-handler"><span class="handle"></span></span>';
	resizeabeElement.isResizing = false;
	resizeabeElement.lastDownX = 0;

	var handle = resizeabeElement.querySelectorAll('.drag-handler > .handle')[0];

	handle.addEventListener('mousedown', function(event){
	    resizeabeElement.isResizing = true;
	    resizeabeElement.lastDownX = event.clientX;
	    resizeabeElement.elemMinWidth = minWidth;
	    resizeabeElement.lastEmentWidth = parseInt(getComputedStyle(resizeabeElement).width)
	    console.log('mounsedown', resizeabeElement.lastDownX);
	});

	window.addEventListener('mousemove', function(event){
		
		if(!resizeabeElement.isResizing) return;

		var newWidth = resizeabeElement.lastEmentWidth + (event.clientX - resizeabeElement.lastDownX);

		if(resizeabeElement.elemMinWidth > newWidth) return;

		resizeabeElement.style.width =  newWidth+ 'px';

		

	});


	window.addEventListener('mouseup', function(event){
		
		resizeabeElement.isResizing = false;

	});
	
	
}



window.onload = function()
{
	window.makeHorizontalResizeable('.activity-detail-tray', 190);
}
