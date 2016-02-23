# floater.js
Yet another floating label implementation for web. Minimalistic styling, plain JavaScript.

# What it does
Basically it just moves the placeholder text to somewhere else when the input is focused. Only for usability.
See few examples and download preset stylesheets at http://projects.tarvainen.xyz/floater/.

![](http://projects.tarvainen.xyz/floater/floater.jpg)

The example above is achieved with the code below.


# Installation
Just run `npm install floater.js`.

# Usage
Include the `floater.js` or `floater.min.js` in your html file like the below. Add also few text inputs with placeholders and class `floater` set.

    <html>
      <head>
      <link href="style.css" rel="stylesheet"/>
      </head>
    
      <body>
        <form>
          <input type="text" class="floater" floater-id="name" placeholder="Name">
          <input type="text" class="floater" floater-id="phone" placeholder="Phone">
          <input type="text" class="floater" floater-id="address" placeholder="Address">
        </form>
      </body>
      
      <script src="path_to_your_floater/floater.min.js"></script>
      <script src="script.js"></script>
    </html>
    
In your script.js write the following.

    var opts = {
    	class: 'floater',
    	attribute: 'label',
    	usePlaceholder: true
    };
    
    var floater = new Floater(opts).float();
    
If the `usePlaceholder` is set to `false` will the value be retrieved from the attribute specified in the opts's `attirbute` property.

    <input type="text" label="This is the label" class="floater" placeholder="There is also the placeholder">

## Styling
The floater.js is styled with the css and for complete styling you have only these few classnames to use. Specify the next in your `style.css`.

    body {
    	font-family: sans-serif;
    }
    
    input {
    	width: 100%;
    	height: 30px;
    	border-radius: 5px;
    	outline: none;
    	border: 1px solid rgb(240, 240, 240);
    	padding: 5px;
    }
    
    .floater-container {
    	margin-top: 20px;
    	width: 200px;
    	position: relative;
    }
    
    .floater-label {
    	display: inline;
    	position: absolute;
    	font-size: 70%;
    	transition: 0.2s;
    	left: 5px;
		pointer-events: none;
    }
    
    .floater-label.hidden {
    	animation: slideDown 0.4s;
    	transform: translate(0, 50%);
    	color: rgb(200, 200, 200);
    }
    
    .floater-label.visible {
    	animation: slideUp 0.4s;
    	transform: translate(0, -100%);
    	color: #F88071;
    }
    
    .floater::-webkit-input-placeholder {
    	opacity: 0 !important;
    }
    
    .floater::-moz-placeholder {
    	opacity: 0 !important;
    }
    
    .floater:-moz-placeholder {
    	opacity: 0 !important;
    }
    
    .floater:-ms-input-placeholder {
    	opacity: 0 !important;
    }

## Messages
Floater.js is also capable of sending message to the field which will be removed on `keyup` in the field.
For example in your HTML define a new button with a onclick event.

    <button onclick="return doSomething()">Do something</button>

And add the following in to your `script.js`.

    function doSomething () {
    	floater.message({
    		id: 'name', // the floater-id selector of the field
    		text: 'The field may not be empty',
    		duration: 3000,
    		type: 'bad' // this is a classname for the message
    	});
    
    	return false;
    }
    
By defining the `type` property you may add a specific classname for your message so it can be styled in the css. Add the following in to your `style.css`.

    .floater-message {
    	position: absolute;
    	display: inline;
    	opacity: 0;
    	right: 5px;
    	transition: 0.3s;
    	font-size: 70%;
    	color: #fff;
    	display: block;
    	padding: 2px;
    	z-index: -1;
    }

    .floater-message.hidden {
    	animation: slideDown 0.4s;
    	transform: translate(0, 50%);
    	opacity: 0;
    }
    
    .floater-message.visible {
    	animation: slideUp 0.4s;
    	transform: translate(0, -100%);
    	opacity: 1;
    }
    
    .floater-message.good {
    	background: #03C03C;
    }
    
    .floater-message.bad {
    	background: #C23B22;
    }
    
    button {
        outline: none;
        border: none;
        background-color: rgb(100, 100, 100);
        color: white;
        border-radius: 5px;
    }
    
