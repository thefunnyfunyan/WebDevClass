var $ = require('jquery');

// Transform an ordinary text input into an autocomplete
// widget.  The first argument is the input element to alter,
// the second is a map of options.  The url option must be
// defined, and point to a url that, when a partial entry
// is appended to the request, will return an array of options
// as a JSON object.
// An 'onclick' callback can optionally be specified to trigger
// when the user selects an autocomplete option.  It takes the
// option's text as an argument.
function autocomplete(element, options) {
  // we require a url option - this is where we
  // get our list of potential words from
  if(!options.url) return console.error("autocomplete requires a url to work.")

  var acInput = $(element),
      acList = $('<div>');

  // Turn off the browser-based autocomplete
  acInput.attr('autocomplete', 'off');

  // Add the autocomplete list to the page
  // beneath its corresponding input
  $('body').append(acList);
  var offset = acInput.offset();
  acList.offset({
    left: offset.left,
    top: offset.top + acInput.height()
  });

  // Helper function to populate the autocomplete
  // list with options that glow when hovered over
  // and complete the input when clicked.
  function populateList(choices) {
    // first empty the list
    acList.empty();
    // then add all choices as children
    choices.forEach( function(optionText) {
      var opt = $('<div>');
      opt.width(200);
      opt.html(optionText);
      opt.css('color', 'blue');
      opt.css('border', '1px solid blue');
      opt.css('background-color','white');
      opt.on('mouseover', function(){opt.css('background-color', 'yellow')});
      opt.on('mouseout', function(){opt.css('background-color', 'white')});
      opt.on('click', function(){
        acInput.val(optionText);
        if(options.click) options.click(optionText);
        acList.empty();
      });
      acList.append(opt);
    });
  }

  // Attach an 'input' event listener to the input
  // that will offer autocomplete options.
  acInput.on('input', function() {
    $.get({
      url: options.url + acInput.val(),
      success: function(data) {
        populateList(data);
      }
    });
  });
}

module.exports = exports = autocomplete;
