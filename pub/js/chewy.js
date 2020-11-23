/* JS Library usage examples */
"use strict";
console.log('chewy.js loaded')

function Chewy() {
	const _self = {}
	_self.inViewMode = false;
	// var formatsDict = {71: '3 x 3 grid', 221: 'slideshow', 76: 'column'};
	// var codesDict = {71: 'G', 221: ']', 76: 'L'};
	_self.formatsDict = {};
	_self.codesDict = {};
	_self.oldBody;
	//average web pages 1024 pixels wide by 768 pixels high.
	_self.pageHeight = window.screen.availHeight; //900
	_self.pageWidth = window.screen.availWidth; //1440

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

	function convertKeyToKeyCode(key) {
		return charToCode[key]; //constants.js
	}

	document.addEventListener("keydown", keyDown, false);

	// Added defer in the <script> tag of the index.html file but this just incase
	window.onload = function() {
		// Add the expandable pop to all web pages using CHEWY.js
		//------------------------------------
		let chewyInfoButton = document.createElement('button');
		chewyInfoButton.classList.add('open-button');
		chewyInfoButton.onclick = () => document.getElementById("popup").style.display = "block";
		chewyInfoButton.innerHTML = 'This page is CHEWY.js supported! <br> Click here to view commands';
		document.body.appendChild(chewyInfoButton);
		//------------------------------------
		let chewyInfo = document.createElement('div');
		chewyInfo.classList.add('info-popup');
		chewyInfo.setAttribute("id","popup");
		//------------------------------------
		let header = document.createElement('h2');
		header.innerHTML = 'Below are all the CHEWY.js commands';
		chewyInfo.appendChild(header);
		//------------------------------------
		let label = document.createElement('label');
		label.innerHTML = 'Keyboard button - Format';
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
				//buildFormat(formatsDict[keyCode], allImgs);
				//document.body = formattedImgs
				_self.inViewMode = true;
				popupHelper(_self.codesDict[keyCode])
			}
		}
		else {
			console.log('keyCode of press key is ', keyCode)
		}
	}

	function buildFormat(format, images) {
		const newBody = document.createElement('body')
		// const table = document.createElement('table')
		if (format == '3 x 3 grid') {
			const table = document.createElement('table')
			let tableRow = document.createElement('tr')
			for (let i = 0; i < images.length; i++) {
				let tableCell = document.createElement('td')
				tableCell.classList.add('newImages');
				let img = new Image(_self.pageWidth/3,_self.pageHeight/3);
		        img.src = images[i].src;
		        tableCell.appendChild(img)
		        tableRow.appendChild(tableCell)
		        // table.appendChild(tableRow)
			    if ((i+1) % 3 == 0) {
			    	// tableRow.appendChild(tableCell)
		        	table.appendChild(tableRow)
		        	tableRow = document.createElement('tr')
			    }
			}
			//Add the remaining images if there are any
			if (images.length % 3 != 0) {
				table.appendChild(tableRow)
			}
			newBody.appendChild(table)
		}
		if (format == 'slideshow') {
			const slideshowDiv = document.createElement('div');
			slideshowDiv.setAttribute("style",`height: ${_self.pageHeight*0.9}px; width: ${_self.pageWidth*0.9}px;`);
			slideshowDiv.classList.add('fadein');
			for (let i = 0; i < images.length; i++) {
				// let img = new Image(pageWidth,pageHeight);
				// let width = images[i].width;
				// let height = images[i].height;
				let img = new Image();
		        img.src = images[i].src;
		  		//img.width = '50%';
		        img.setAttribute("style","display: none; min-width: 100%; min-height: 100%; height:auto !important; width:auto !important; margin-left: auto; margin-right: auto;");
		        // img.classList.add('yeet');
		        slideshowDiv.appendChild(img)
			}
			newBody.appendChild(slideshowDiv)
		}
		if (format == 'column') {
			const table = document.createElement('table')
			for (let i = 0; i < images.length; i++) {
				let tableRow = document.createElement('tr')
				let tableCell = document.createElement('td')
				let img = new Image(_self.pageWidth,_self.pageHeight);
		        img.src = images[i].src;
		        tableCell.appendChild(img)
		        tableRow.appendChild(tableCell)
		        table.appendChild(tableRow)
			}
			newBody.appendChild(table)
		}
		// document.body.appendChild(table)
		// newBody.appendChild(table)
		document.body = newBody //Should be done in keyDown
	}

	function getImgs() {
	    var imgs = document.getElementsByTagName("img");
	    var imgSrcs = [];

	    for (var i = 0; i < imgs.length; i++) {
	        imgSrcs.push(imgs[i].src);
	    }

	    return imgs;
	}

	//Slideshow
	$(() => {
	    // $('.fadein img:gt(0)').hide();
	    setInterval(() => {
	    	$('.fadein :first-child').fadeOut().next('img').fadeIn().end().appendTo('.fadein');},
	    	3000);
	    $('.fadein img:gt(0)').hide();
	});

	return _self
}

