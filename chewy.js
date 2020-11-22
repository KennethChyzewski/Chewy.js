/* JS Library usage examples */
"use strict";
console.log('chewy.js loaded')

//Globals
var inViewMode = false;
var formatsDict = {220: '3 x 3 grid', 221: 'slideshow', 48: 'column'};
var codesDict = {220: '\\', 221: ']', 48: '0'};
var oldBody;
//average web pages 1024 pixels wide by 768 pixels high.
const pageHeight = window.screen.availHeight; //900
const pageWidth = window.screen.availWidth; //1440


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
	for (var key in formatsDict) {
	    let tableRow = document.createElement('tr');
	    let tableData = document.createElement('td');
	    tableData.innerHTML = `${codesDict[key]} - ${formatsDict[key]}`;
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

	if (keyCode in formatsDict) {
		if (inViewMode) {
			document.body = oldBody;
			inViewMode = false;
		} else {
			oldBody = document.body;
			let allImgs = getImgs();
			let formattedImgs = buildFormat(formatsDict[keyCode], allImgs);
			//buildFormat(formatsDict[keyCode], allImgs);
			//document.body = formattedImgs
			inViewMode = true;
			popupHelper(codesDict[keyCode])
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
			let img = new Image(pageWidth/3,pageHeight/3);
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
		slideshowDiv.classList.add('fadein');
		for (let i = 0; i < images.length; i++) {
			let img = new Image(pageWidth,pageHeight);
	        img.src = images[i].src;
	        img.setAttribute("style","display: none;");
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
			let img = new Image(pageWidth,pageHeight);
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

function createFormat(key, format) {
	let keyCode = convertKeyToKeyCode(key);
	formatsDict[keyCode] = format;
	codesDict[keyCode] = key;
}

function convertKeyToKeyCode(key) {
	return charToCode[key]; //constants.js
}

//Slideshow
$(() => {
    // $('.fadein img:gt(0)').hide();
    setInterval(() => {
    	$('.fadein :first-child').fadeOut().next('img').fadeIn().end().appendTo('.fadein');},
    	3000);
    $('.fadein img:gt(0)').hide();
});

