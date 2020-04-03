// Button functionality 
// target button 
var $submit = $('#submit');

// Add event listener
$submit.on('click', function(){
    // console.log("You clicked on the submit button!");
    // AJAX request for animal facts
    // if i get cors error, prepend this:  https://cors-anywhere.herokuapp.com/ to the url (see animal facts example)
    var animalFactsURL = "https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2";
    var petFinderURL = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=${type}&api_key=${petFinderAPI}`;
    var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDeXRQZVNycEZNZHhkUU9ac3Q3WFRmQ29lZjJRdlowQ1ZiZEJJZVVBUjhEaElkY3U1TiIsImp0aSI6ImM0MTQ2YjE3NzVkMGYzMTgwNjZlOTgyNWU0YzZkNGZkNzc4NzEyNWNkZjFjN2YzOTEzNTU3OThlY2VkYTU0ODhkYWM1YjI2OTIzMzFkMjY4IiwiaWF0IjoxNTg1ODYwMzE2LCJuYmYiOjE1ODU4NjAzMTYsImV4cCI6MTU4NTg2MzkxNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.KLFos68YQd4qsgyeB2NH4eYkTcHKIE3D4K4nXl9DIwZXdK4_3r2FZThD_2IvP848ChP2fkCPUZCQkrT3_1etjSAtDk_UPdsFGDld-zWpjrwHUE5-JgWWJPqcYIMSZF8l80Y865v2Qox7Fc-_XxhuRAFDTCMpnGyPyqIEyNgLZjOdCJF_Z_d270WNv9LFcv03OoU3NGFI2PvkdowDI_4l30iLkYaHTdN9LHb9X9k8dzSPkyqpPW2Mc2RIuvT4zUdFJ05YIlgiuuDQMhc4xwGTwT9N8za1Xij4jtj1OwmxqhoE_VO7j2cEScaaeC3GpEv9lquL32ER0dD6d5LoFESsgg";

    // Animal facts AJAX
    $.ajax({
        url:  animalFactsURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });

    // Pet finder AJAX
    $.ajax({
        url:  petFinderURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
})
//create a generator button for users input to ajax request
//if user selects cat, then next dropdown box will show cat breeds
//create for loop for response







//set values for user input
var type = $("#type").val();
var breed = $("#type1").val();
var age = $("#age").val();
