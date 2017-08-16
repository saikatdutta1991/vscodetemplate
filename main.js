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



/* resizeabe div */

window.addTemplateFragment = function(template = '', appendTo = document.html)
{

	var frag = document.createRange().createContextualFragment(template);

	appendTo.parentNode.insertBefore(frag, appendTo.nextSibling);
}

window.makeHorizontalResizeable = function(eName, minWidth)
{
	var resizeabeElement = document.querySelectorAll(eName);

	if(!resizeabeElement.length) return;

	resizeabeElement = resizeabeElement[0];

	window.addTemplateFragment('<span class="drag-handler"><span class="handle"></span></span>', resizeabeElement);
		

	resizeabeElement.isResizing = false;
	resizeabeElement.lastDownX = 0;

	var handle = resizeabeElement.nextSibling.firstChild;
	console.log(handle);

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

window.directoryList = {};
window.directoryList.dClickListener = function(event) 
{
	var directory = event.target.parentElement;
	console.log(directory);

	if(window.classie.hasClass(directory, 'directory-open')) {
		window.classie.removeClass(directory, 'directory-open')
	} else {
		window.classie.addClass(directory, 'directory-open');
	}

}

window.createFragNode = function (template)
{
	return document.createRange().createContextualFragment(template);
}

window.initDirectoryTree = function(query, data, config = {})
{
	var holder = document.querySelectorAll(query);

	if(!holder[0]) {
		return;
	}

	holder = holder[0];

	var directoryNode = window.buildDirectoryNodes(data);

	directoryNode.className += config.hasOwnProperty('class') ? ' '+ config.class : '';

	holder.parentNode.replaceChild(directoryNode, holder);

}


window.buildDirectoryNodes = function(data)
{
	// array means list of nodes
	if(Array.isArray(data)) {

		var _ulNode = document.createElement('ul');
		window.classie.addClass(_ulNode, 'directory-list');
		

		data.forEach(function(file, index, array){

			var _c = file.hasOwnProperty('class') ? file.class : '';
			var _id = file.hasOwnProperty('id') ? file.id : '';

	
			//if each list item is direcotry
			if(file.type == 'directory') {

				var _liNode = document.createElement('li');
				_liNode.className += ' directory' + _c;
				_liNode.id = _id;

				var _span = document.createElement('span');
				_span.className += ' directory-item';
				_span.innerHTML = '<i class="material-icons icon">change_history</i>'+ file.title;

				_span.addEventListener("click", window.directoryList.dClickListener);console.log(_liNode)

				_liNode.appendChild(_span);

				if(file.hasOwnProperty('list')) {
					var newULNode = window.buildDirectoryNodes(file.list);
					_liNode.appendChild(newULNode);
				}


				_ulNode.appendChild(_liNode);



			} 
			//if each list iitem is file
			else if(file.type == 'file') {

				_liHTML = '<li class="file '+_c+'" id="'+_id+'">'
							+'<span class="file-item">'
							 	+'<i class="material-icons icon">label_outline</i>'
							 	+ file.title
							+ '</span>'
							+ '</li>';

				var _liNode = window.createFragNode(_liHTML);
				_ulNode.appendChild(_liNode);
			
			}

		});	

		return _ulNode;
	} 

	return window.createFragNode('');
}



window.onload = function()
{

	window.makeHorizontalResizeable('.activity-detail-tray', 170);


	var data = [
		{
			title : 'dist',
			class : '',
			type : 'directory',
			id : 1,
		},
		{
			title : 'node_modules',
			type : 'directory',
			id : 2,
		},
		{
			title : 'src',
			type : 'directory',
			id : 3,
			list : [
				{
					title : 'dist',
					type : 'directory',
					id : 4,
				},
				{
					title : 'node_modules',
					type : 'directory',
					id : 5,
				},
				{
					title : 'src',
					type : 'directory',
					id : 6,
					list : [

						{
							title : 'dist',
							type : 'directory',
							id : 7,
						},
						{
							title : 'node_modules',
							type : 'directory',
							id : 8,
						},
						{
							title : 'src',
							type : 'directory',
							id : 9
						},
						{
							title : 'sample.txt',
							type : 'file',
							id : 10
						}

					]
				},
				{
					title : 'sample.txt',
					type : 'file',
					id : 11
				}
			]
		},
		{
			title : 'sample.txt',
			type : 'file',
			id : 12
		}
	];

	window.initDirectoryTree('#directory-list1', data, {
		class : 'padding-zero padding-left-7px'
	});
	
}

