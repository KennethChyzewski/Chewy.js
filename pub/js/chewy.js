/* JS Library usage examples */
"use strict";
console.log('chewy.js loaded')

function Chewy() {
	const _self = {}
	_self.inViewMode = false;
	_self.formatsDict = {};
	_self.codesDict = {};
	_self.oldBody;
	// Regexs that validate developer inputs
	_self.formatExpressions = {
		'grid': /^\d+\s+x\s+\d+\s+grid$/, 
		'slideshow': /^\d*\s*slideshow$/,
		'full_slideshow': /^fullscreen\s*\d*\s*slideshow$/, 
		'column': /^column$/,
		'full_column': /^fullscreen\s*column$/,
		'multi_column': /^\d+\s*column$/,  
		'row': /^row$/,
		'full_row': /^fullscreen\s*row$/
	};
	//average web pages 1024 pixels wide by 768 pixels high.
	_self.pageHeight = window.innerHeight*0.999; 
	_self.pageWidth = window.innerWidth*0.999;
	_self.transitionTime = 3000;

	_self.createFormat = function(key, format) {
		let keyCode = convertKeyToKeyCode(key);
		_self.formatsDict[keyCode] = format;
		_self.codesDict[keyCode] = key;
	}

	_self.deleteFormat = function(key) {
		let keyCode = convertKeyToKeyCode(key);
		delete _self.formatsDict[keyCode];
		delete _self.codesDict[keyCode];
	}

	_self.updateFormat = function(key, format) {
		let keyCode = convertKeyToKeyCode(key);
		_self.formatsDict[keyCode] = format;
	}

	document.addEventListener("keydown", keyDown, false);

	// Added defer in the <script> tag of the index.html file but this just incase
	window.onload = function() {
		// Add the expandable pop to all web pages using CHEWY.js
		//------------------------------------
		let chewyInfoButton = document.createElement('button');
		chewyInfoButton.classList.add('open-button');
		chewyInfoButton.onclick = () => document.getElementById("popup").style.display = "block";
		chewyInfoButton.innerHTML = 'This page is CHEWY supported! <br> Click here to view commands';
		document.body.appendChild(chewyInfoButton);
		//------------------------------------
		let chewyInfo = document.createElement('div');
		chewyInfo.classList.add('info-popup');
		chewyInfo.setAttribute("id","popup");
		//------------------------------------
		let header = document.createElement('h2');
		header.classList.add('popup-header');
		header.innerHTML = 'Below are all the CHEWY commands';
		chewyInfo.appendChild(header);
		//------------------------------------
		let label = document.createElement('label');
		label.classList.add('popup-label');
		label.innerHTML = 'Keyboard button	 -	 Format';
		chewyInfo.appendChild(label);
		//------------------------------------
		let table = document.createElement('table');
		let tbody = document.createElement('tbody');
		for (var key in _self.formatsDict) {
		    let tableRow = document.createElement('tr');
		    let tableData = document.createElement('td');
		    tableData.innerHTML = `${_self.codesDict[key]} - ${_self.formatsDict[key]}`;
		    tableRow.appendChild(tableData);
		    tbody.appendChild(tableRow);
		}
		table.appendChild(tbody);
		chewyInfo.appendChild(table);
		//------------------------------------
		let closeButton = document.createElement('button');
		closeButton.classList.add('close-button');
		closeButton.onclick = () => document.getElementById("popup").style.display = "none";
		closeButton.innerHTML = 'Close';
		chewyInfo.appendChild(closeButton);
		//------------------------------------
		document.body.appendChild(chewyInfo);
	}

	function popupHelper(key) {
		// Add the expandable pop to all web pages using CHEWY.js
		//------------------------------------
		let chewyInfoButton = document.createElement('button');
		chewyInfoButton.classList.add('open-button');
		chewyInfoButton.innerHTML = `Press the ' ${key} ' button to return to normal!`;
		document.body.appendChild(chewyInfoButton);
	}

	function keyDown(e) {
		//https://css-tricks.com/snippets/javascript/javascript-keycodes/
		var shiftKey = e.shiftKey
		var keyCode = e.keyCode;

		if (keyCode in _self.formatsDict) {
			if (_self.inViewMode) {
				document.body = _self.oldBody;
				_self.inViewMode = false;
			} else {
				_self.oldBody = document.body;
				let allImgs = getImgs();
				let formattedImgs = buildFormat(_self.formatsDict[keyCode], allImgs);
				_self.inViewMode = true;
				popupHelper(_self.codesDict[keyCode])
			}
		}
		else {
			console.log('keyCode of press key is ', keyCode)
		}
	}

	function buildFormat(format, images) {
		const newBody = document.createElement('body');
		newBody.classList.add('remove-margin');
		// const table = document.createElement('table')
		// NEW IF CONDITIONS if (_self.formatExpressions['grid'].test(format))
		// if (format == '3 x 3 grid') {
		if (_self.formatExpressions['grid'].test(format)) {
			const table = document.createElement('table');
			let tableRow = document.createElement('tr');
			let gridDimensions = parseGridFormat(format);
			let rows = gridDimensions[0];
			let columns = gridDimensions[1];
			// for (let i = 0; i < images.length; i++) {
			let totalIterations = Math.min(images.length, rows*columns)
			for (let i = 0; i < totalIterations; i++) {
				let tableCell = document.createElement('td')
				tableCell.classList.add('newImages');
				let img = new Image(_self.pageWidth/rows, _self.pageHeight/columns); //3 and 3
		        img.src = images[i].src;
		        tableCell.appendChild(img)
		        tableRow.appendChild(tableCell)
		        //
			    if ((i+1) % rows == 0) {
		        	table.appendChild(tableRow)
		        	tableRow = document.createElement('tr')
			    }
			}
			//Add the remaining images if there are any
			if (images.length % rows != 0) { //3
				table.appendChild(tableRow)
			}
			newBody.appendChild(table)
		}
		else if (_self.formatExpressions['slideshow'].test(format)) {
			if (format.match(/\d+/) !== null) {
				_self.transitionTime = format.match(/\d+/)[0] * 1000;
			} else {
				_self.transitionTime = 3000; //default
			}
			const slideshowDiv = document.createElement('div');
			slideshowDiv.setAttribute("style",`height: ${_self.pageHeight}px; width: ${_self.pageWidth}px;`);
			slideshowDiv.classList.add('fadein');
			for (let i = 0; i < images.length; i++) {
				let img = new Image();
		        img.src = images[i].src;
		        img.setAttribute("style","display: none; text-align: center; height:auto !important; width:auto !important; margin-left: auto; margin-right: auto;");
		        slideshowDiv.appendChild(img)
			}
			newBody.appendChild(slideshowDiv)
			setSlideshow()
		}
		else if (_self.formatExpressions['full_slideshow'].test(format)) {
			if (format.match(/\d+/) !== null) {
				_self.transitionTime = format.match(/\d+/)[0] * 1000;
			} else {
				_self.transitionTime = 3000; //default
			}
			const slideshowDiv = document.createElement('div');
			slideshowDiv.setAttribute("style",`height: ${_self.pageHeight}px; width: ${_self.pageWidth}px;`);
			slideshowDiv.classList.add('fadein');
			for (let i = 0; i < images.length; i++) {
				let img = new Image();
		        img.src = images[i].src;
		        img.setAttribute("style","display: none; min-width: 100%; min-height: 100%; height:auto !important; width:auto !important; margin-left: auto; margin-right: auto;");
		        slideshowDiv.appendChild(img)
			}
			newBody.appendChild(slideshowDiv)
			setSlideshow()
		}
		else if (_self.formatExpressions['column'].test(format)) {
			const table = document.createElement('table')
			for (let i = 0; i < images.length; i++) {
				let tableRow = document.createElement('tr')
				let tableCell = document.createElement('td')
				tableCell.setAttribute("align","center");
				// tableCell.classList.add('column-td');
				//tableCell.setAttribute("style","display: block; margin-left: auto; margin-right: auto;");
				let img = new Image();
		        img.src = images[i].src;
		        img.setAttribute("style","display: block; margin-left: auto; margin-right: auto;");
		        tableCell.appendChild(img)
		        tableRow.appendChild(tableCell)
		        table.appendChild(tableRow)
			}
			newBody.appendChild(table)
		}
		else if (_self.formatExpressions['full_column'].test(format)) {
			const table = document.createElement('table')
			for (let i = 0; i < images.length; i++) {
				let tableRow = document.createElement('tr')
				let tableCell = document.createElement('td')
				let newHeight = getNewImgDimensions(images[i].height, images[i].width);
				let img = new Image(_self.pageWidth, newHeight);
				// let img = new Image();
		        img.src = images[i].src;
		        img.setAttribute("style","display: block; margin-left: auto; margin-right: auto;");
		        tableCell.appendChild(img)
		        tableRow.appendChild(tableCell)
		        table.appendChild(tableRow)
			}
			newBody.appendChild(table)
		}
		else if (_self.formatExpressions['multi_column'].test(format)) {
			const table = document.createElement('table');
			let tableRow = document.createElement('tr');
			let columns = format.match(/\d+/)
			for (let i = 0; i < images.length; i++) {
				let tableCell = document.createElement('td')
				tableCell.classList.add('newImages');
				let img = new Image(_self.pageWidth/columns, _self.pageHeight/columns);
		        img.src = images[i].src;
		        tableCell.appendChild(img)
		        tableRow.appendChild(tableCell)
		        //
			    if ((i+1) % columns == 0) {
		        	table.appendChild(tableRow)
		        	tableRow = document.createElement('tr')
			    }
			}
			//Add the remaining images if there are any
			if (images.length % columns != 0) { //3
				table.appendChild(tableRow)
			}
			newBody.appendChild(table)
		}
		else if (_self.formatExpressions['row'].test(format)) {
			const table = document.createElement('table')
			let tableRow = document.createElement('tr')
			for (let i = 0; i < images.length; i++) {
				let tableCell = document.createElement('td')
				let newHeight = getNewImgDimensions(images[i].height, images[i].width);
				let img = new Image();
		        img.src = images[i].src;
		        img.setAttribute("style","display: block; margin-left: auto; margin-right: auto;");
		        tableCell.appendChild(img)
		        tableRow.appendChild(tableCell)
			}
		    table.appendChild(tableRow)
			newBody.appendChild(table)
		}
		else if (_self.formatExpressions['full_row'].test(format)) {
			const table = document.createElement('table')
			let tableRow = document.createElement('tr')
			for (let i = 0; i < images.length; i++) {
				let tableCell = document.createElement('td')
				let newWidth = getNewImgDimensions(images[i].height, images[i].width, 'width');
				let img = new Image(newWidth, _self.pageHeight);
		        img.src = images[i].src;
		        img.setAttribute("style","display: block; margin-left: auto; margin-right: auto;");
		        tableCell.appendChild(img)
		        tableRow.appendChild(tableCell)
			}
		    table.appendChild(tableRow)
			newBody.appendChild(table)
		}
		else {
			throw new Error("CHEWY format input error.");
		}
		// document.body.appendChild(table)
		// newBody.appendChild(table)
		document.body = newBody //Should be done in keyDown
	}

	function convertKeyToKeyCode(key) {
		return charToCode[key]; //constants.js
	}

	function getImgs() {
	    var imgs = document.getElementsByTagName("img");
	    var imgSrcs = [];

	    for (var i = 0; i < imgs.length; i++) {
	        imgSrcs.push(imgs[i].src);
	    }

	    return imgs;
	}

	function getNewImgDimensions(height, width, flag='') {
		let aspectRatio = width/height;
		if (flag === 'width') {
			let newWidth = _self.pageHeight*aspectRatio
			return newWidth
		}
		let newHeight = _self.pageWidth/aspectRatio
		return newHeight
	}

	function parseGridFormat(format) {
		let numbers = [];
		let number = '';
		for (var i = 0; i < format.length; i++) {
		  	if (/^\d+$/.test(format[i])) {
		    	number += format[i]
		  	} else {
		    	let temp = parseInt(number)
		    	if (Number.isInteger(temp)) {
		  			numbers.push(parseInt(number))
		  			number = ''
		    	}
		  	}
		}
		return numbers
	}

	//Slideshow
	function setSlideshow() {
		//NEEDS TO BE FIXED
		console.log(_self.transitionTime)
		$(() => {
		    // $('.fadein img:gt(0)').hide();
		    setInterval(() => {
		    	$('.fadein :first-child').fadeOut().next('img').fadeIn().end().appendTo('.fadein');},
		    	_self.transitionTime);
		    $('.fadein img:gt(0)').hide();
		});
	}

	return _self
}

