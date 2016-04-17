console.log("HELLO FROM THE JAVASCRIPT CONSOLE!");
$.ajax({
   type: 'GET',
   url: "http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=bcb83c4b54aee8418983c2aff3073b3b",
   success: function(data) {
     console.log("We have your weather!");
     console.log(data);
   },
   error: function() {
     console.error("An error occured.");
   },
});

console.log("NEW TEXT WHATEVER");
