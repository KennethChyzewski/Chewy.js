/* JS Library usage examples */
"use strict";
console.log('examples.js loaded')

const chewy = Chewy()
chewy.createFormat('K', '69 x 69 grid')
chewy.deleteFormat('K')
chewy.createFormat('L', 'row')
chewy.updateFormat('L', 'column')
chewy.createFormat('G', '3 x 3 grid')
chewy.createFormat(']', 'slideshow')
chewy.createFormat('S', '1 slideshow')
chewy.createFormat('Q', '4 x 4 grid')
chewy.createFormat('E', '2 x 6 grid')
chewy.createFormat('R', 'row')
chewy.createFormat('1', 'fullscreen 3 slideshow')
chewy.createFormat('2', 'fullscreen column')
chewy.createFormat('3', 'fullscreen row')
chewy.createFormat('4', '3 column')

