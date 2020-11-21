/* JS Libraries */
"use strict";
console.log('----------')
console.log('SCRIPT: Creating and loading our JS libraries')

// Let's make a small Jquery clone.
// One way to make a library is to write a function
// that returns an object with the library functions, important
// values, etc.
function $$$(selector) {

	const _self = {}
	_self.selector = selector
	_self.element = document.querySelector(selector) 

	_self.text = function() {
		return _self.element.innerText
	}

	_self.addClass = function(className) {
		if (!_self.element.classList.contains(className)) {
			_self.element.classList.add(className)
		}
	}

	_self.attr = function(name, value) {
		if (!value) {
			return _self.element.getAttribute(name)
		} else {
			_self.element.setAttribute(name, value)
		}
	}

	return _self
}

///////
// Different way of creating library: creating an object constructor and then
// adding to its prototype.

// A Circle Generator Library (which also uses some jQuery functions)

function CircleGenerator() {
	// the constructor function shouhld instantiate any variables that
	//  each Circle Generator instance should have a unique version of.
	//  In this case, each CG should have its own array of circles separate from
	//  other CGs.
	this.circles = []
	// this..
	// this.. (any values you need for each 'instance' of this library)
}

// For funcionality and values common to all CircleGenerators,
//  we can add to the prototype property of the constructor.
CircleGenerator.prototype = {

	// Every CG will make use of the same makeCircle() and changeCircleColors function
	makeCircle: function() {
		const circle = document.createElement('div')
		circle.style = 'width: 60px; height: 60px; border-radius: 50%; margin: 10px; background-color: Aqua;'
		
		// why not use a little jQuery:
		const body = $('body') // jQuery equivalent to: const body = document.querySelector('body')
		body.append(circle)
		
		this.circles.push(circle) // add to the circles list
	},

	changeCirclesColor: function() {
		for (let i = 0; i < this.circles.length; i++) {
			this.circles[i].style.backgroundColor = 'darkmagenta'
		}
	}

}

// Above is the code for the library itself.
// We will use our libraries in a separate script file, examples.js


