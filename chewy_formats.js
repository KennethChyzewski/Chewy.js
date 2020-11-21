/* JS Library usage examples */
"use strict";
log('----------')
log('SCRIPT: Examples of using our libraries')
log('In general, we should have the code that uses our libraries separate from the actual library code.')

//Want to add Add clickable popup
// <div id="LPMcontainer-1605629699909-3" class="LPMcontainer LPMoverlay" role="button" tabindex="0" style="margin: auto 1px 1px auto; padding: 0px; border-style: solid; border-width: 0px; font-style: normal; font-weight: normal; font-variant: normal; list-style: outside none none; letter-spacing: normal; line-height: normal; text-decoration: none; vertical-align: baseline; white-space: normal; word-spacing: normal; background-repeat: repeat-x; background-position: left bottom; background-color: rgb(245, 191, 0); border-color: transparent; border-radius: 2px; width: 30px; height: 140px; cursor: pointer; display: block; z-index: 107158; position: fixed; top: auto; bottom: 0px; left: auto; right: 0px;"><img src="https://storage.static-gm.com/ah/1501b00b-257c-4f59-9d0c-59349820be3d/5715083b-674f-428f-a7d5-2fd8a5345025/Chat-bubble.png" id="LPMimage-1605629699910-4" alt="" class="LPMimage" style="margin: 0px; padding: 0px; border-style: none; border-width: 0px; font-style: normal; font-weight: normal; font-variant: normal; list-style: outside none none; letter-spacing: normal; line-height: normal; text-decoration: none; vertical-align: baseline; white-space: normal; word-spacing: normal; position: absolute; top: 108px; left: 6px; z-index: 600;"><div id="LPMlabel-1605629699910-5" class="LPMlabel" style="margin: 0px; padding: 0px; border-style: none; border-width: 0px; font-style: normal; font-weight: normal; font-variant: normal; list-style: outside none none; letter-spacing: normal; line-height: normal; text-decoration: none; vertical-align: baseline; white-space: nowrap; word-spacing: normal; position: absolute; transform: rotate(270deg); font-family: Arial, Helvetica, sans-serif; color: rgb(255, 255, 255); top: 48px; left: -31px; font-size: 14px; z-index: 601;">MESSAGE US</div></div>

var elem = document.createElement('div');
elem.innerHTML = 'This page is CHEWY supported!';
elem.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#7CDEDC';
document.body.appendChild(elem);

// function img_find() {
//     var imgs = document.getElementsByTagName("img");
//     var imgSrcs = [];

//     for (var i = 0; i < imgs.length; i++) {
//         imgSrcs.push(imgs[i].src);
//     }

//     return imgSrcs;
// }



// Some normal jQuery:
const e = $('#myId')
log(e.text())

// Our jQuery clone:
const e2 = $$$('#myId')
log(e2.text())
e2.addClass('myClass')
e2.attr('myAttr', 'test')
log(e2.attr('myAttr'))

// Circle Generator
const cg = new CircleGenerator()
cg.makeCircle()
cg.makeCircle()
cg.changeCirclesColor()
const cg2 = new CircleGenerator() // will have its own circles seperate from cg, but the same prototype reference
cg2.makeCircle()