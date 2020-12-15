# js-library-chyzewsk

# URL to Chewy.js landing page:
https://enigmatic-brook-57872.herokuapp.com/

# URL to Chewy.js documentation:
https://enigmatic-brook-57872.herokuapp.com/documentation.html

# Getting Started
## How to install
Insert the following tags into all of your .html files
```
<link rel="stylesheet" type="text/css href="css/styles.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript src="js/constants.js></script>
<script defer type="text/javascript" href="js/chewy.js"></script>
```

The first three files are Chewy.js dependencies.
The first file is the style sheet for the expandable pop-up assistant that your users can interact with.
The second file is jQuery.js library that Chewy.js uses to fetch imgs on the present website.
The third file are the hardcoded keyboard buttons (known as keycodes) and their numerical value mappings. For example the keyboard button "A" has the value 65.
The fourth and final file is the Chewy.js library itself.

## How to use (as a Developer)
Insert the following Javascript code into your highest level .js file (could be titled index.js or App.js)
const chewy = new Chewy() // Create an instance of Chewy.js
You will notice the Chewy.js assistant appearing on the bottom right of your web page. ↘
If you expand the assistant by clicking on it, you will find a list of all the available Chewy.js commands your users can interact with.
You may have noticed, there are no commands! Lets make use of the Chewy.js API to add some commands.
Below are the three available functions you can utilize to modify Chewy.js to your liking.
```
chewy.createFormat(`K`, `3 x 3 grid`) // Add a viewing format your users would appreciate
chewy.updateFormat(`K`, `fullscreen column`) // Modify existing formats based on user feedback
chewy.deleteFormat(`K`) // Remove existing formats
```
Pretty intuitive right?
createFormat lets you create a viewing format and map it to a keyboard button.
updateFormat lets you modifying existing viewing formats by specifiying a keyboard button and a new viewing format.
deleteFormat lets you delete existing viewing formats by specifying the keyboard button you want to free up.
Below is a list of all the available formats you can create (Planning to add more in the future).

Viewing Format | Description
--- | ---
**a** x **b** grid | Formats the images on the page into a **a** by **b** grid. This will change an image's aspect ratio, potentially ruining the image quality. This viewing format will only display the first **a** times **b** images on the current web page, meaning any more images will be hidden. Look into "column" to avoid this
[fullscreen] [ **a** ] column | Formats the images on the page into **a** column(s). The 'fullscreen' and '**a**' parameters are both optional. If you do not specify an **a** value, Chewy will default to display all images in a single column. If you do specify an **a** value, Chewy will divide the page into **a** columns and change the images to fit the maximum boundaries of the column. This will change an image's aspect ratio, potentially ruining the image quality. If you do not add the 'fullscreen' parameter, Chewy will display the images the way they are presented on the website, in a single column without changing any of their aspect ratios. If you do specify the 'fullscreen' parameter, Chewy will display a single image stretched to the height and width of the user's screen and all other images will display underneath it, in column fashion.
[fullscreen] [ **a** ] row | Formats the images on the page into **a** row(s). The 'fullscreen' and '**a**' parameters are both optional. If you do not specify an **a** value, Chewy will default to display all images in a single row. If you do specify an **a** value, Chewy will divide the page into **a** rows and change the images to fit the maximum boundaries of the row. This will change an image's aspect ratio, potentially ruining the image quality. If you do not add the 'fullscreen' parameter, Chewy will display the images the way they are presented on the website, in a single row without changing any of their aspect ratios. If you do specify the 'fullscreen' parameter, Chewy will display a single image stretched to the height and width of the user's screen and all other images will display to the right of it, in row fashion.
[fullscreen] [ **a** ] slideshow | Formats the images on the page into a slideshow, where each image is displayed for **a** seconds. The 'fullscreen' and '**a**' parameters are both optional. If you do not specify an **a** value, Chewy will default to display all images, each 3 seconds at a time. If you do specify an **a** value, Chewy will divide the page into **a** columns and change the images to fit the maximum boundaries of the column. This will change an image's aspect ratio, potentially ruining the image quality. If you do not add the 'fullscreen' parameter, Chewy will display the images the way they are presented on the website, in a single row without changing any of their aspect ratios. If you do specify the 'fullscreen' parameter, Chewy will display a single image stretched to the height and width of the user's screen and all other images will display after it, in slideshow fashion.

## How to use (as a User)
Similar to a developer, a user may notice the Chewy assistant on the bottom right ↘ and click on it to learn more.

As easy it was for the developer to install and setup Chewy, a user simply presses a keyboard button and the page will automatically transform to one of your viewing formats.
You may think, thats awesome! But how can a user revert the web page to its original state or potentially a different viewing format? Have no fear, Chewy is here!
The Chewy assistant will automatically transform asynchronously, informing the user how to revert back to the original web page. After doing so, Chewy will also transform into its original state, ready to assist your users. 
While unavoidable, a new user to your website will likely interact with Chewy on accident, but a good developer will map viewing formats to unused keyboard buttons to reduce this.
For example, if your website has users often entering their cell-phone information, a good idea would be to avoid mapping a viewing format to any of the numeric keyboard buttons (1, 2, 3, 4, 5, 6, 7, 8, 9, 0).
Once a user becomes aware of Chewy and its minimal learning curve, your users will be on their way to browse your website with their own choice of viewship that you provided them.

## Yes. It is really that simple
