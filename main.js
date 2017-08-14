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

		console.log(btnIcon);

		btnIcon.addEventListener("click", window.directoryList.dClickListener);

	});


}