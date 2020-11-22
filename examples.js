/* JS Library usage examples */
"use strict";
console.log('examples.js loaded')

const chewy = new Chewy()
chewy.createFormat('\\', '3 x 3 grid')
chewy.createFormat(']', 'slideshow')
chewy.createFormat('0', 'column')


// Some normal jQuery:
// const e = $('#myId')
// log(e.text())

// Our jQuery clone:
// const e2 = $$$('#myId')
// log(e2.text())
// e2.addClass('myClass')
// e2.attr('myAttr', 'test')
// log(e2.attr('myAttr'))

// Circle Generator
// const cg = new CircleGenerator()
// cg.makeCircle()
// cg.makeCircle()
// cg.changeCirclesColor()
// const cg2 = new CircleGenerator() // will have its own circles seperate from cg, but the same prototype reference
// cg2.makeCircle()