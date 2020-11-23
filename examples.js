/* JS Library usage examples */
"use strict";
console.log('examples.js loaded')

const chewy = Chewy()
chewy.createFormat('K', '69 x 69 grid')
chewy.createFormat('G', '3 x 3 grid')
chewy.createFormat(']', 'slideshow')
chewy.createFormat('L', 'row')
chewy.deleteFormat('K')
chewy.updateFormat('L', 'column')