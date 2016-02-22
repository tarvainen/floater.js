# floating-labels
Yet another floating label implementation. Minimalistic styling, plain JavaScript.

# What it does
Basically it just moves the placeholder text to somewhere else when the input is focused. Only for usability.
See few examples and download stylesheets at http://projects.tarvainen.xyz/floater/.

# Installation
Just run `npm install floater.js`.

# Usage
Include the `floater.js` or `floater.min.js` in your html file like the below. Add also few text inputs with placeholders and class `floater` set.

    <html>
      <head>
      <link href="../floater.css" rel="stylesheet"/>
      </head>
    
      <body>
        <form>
          <input type="text" class="floater" floater-id="name" placeholder="Name"/>
          <input type="text" class="floater" placeholder="Phone"/>
          <input type="text" class="floater" placeholder="Address"/>
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
