var $ = require('jquery'),
    autocomplete = require('./autocomplete');

$(function(){

  // Autocomplete the equipment name in our reservation system
  autocomplete('#equipment-name', {url: '/equipment/autocomplete/'});

});
