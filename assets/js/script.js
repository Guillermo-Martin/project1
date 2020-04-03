// Button functionality 
// target button 
var $submit = $('#submit');

// Add event listener
$submit.on('click', function(){
    // console.log("You clicked on the submit button!");
    // AJAX request for animal facts
    // if i get cors error, prepend this:  https://cors-anywhere.herokuapp.com/ to the url (see animal facts example)
    var animalFactsURL = "https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2";
    var petFinderURL = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=cat&page=2`;
    var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDeXRQZVNycEZNZHhkUU9ac3Q3WFRmQ29lZjJRdlowQ1ZiZEJJZVVBUjhEaElkY3U1TiIsImp0aSI6IjZlYWYyNDkxNjgwM2ZiNjk4NDBjOTQ0MDJmNGI1ZTYzNjZiYThjNTVjNWFhN2Y4OWM2MWVhM2I5MmY3MTMxY2QzOGRkNTA0YmFhY2M5NGE1IiwiaWF0IjoxNTg1OTQ2MTc5LCJuYmYiOjE1ODU5NDYxNzksImV4cCI6MTU4NTk0OTc3OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.BTUKjnjspkvY0iv8u2m-vdtj5x4sX3kHqniG2P4rxRlaxfHdOwJK5i_saqB3OkQJAY4i2DETgwbPGjliaj-jxz6QwRgaBueVsqHAolwTyT_TmZICdEdbQSEASMi52L_1Zk91LGvdq4ynqFZv_ai-8ZXt7XClW_BaGeYD5zG1OpCL4ZSYxDfW_hpGSTVMb-q0FRcrsNdEgbnYpzDsVS-k4Ae8NF0zbJ7HyztNxFeDkloNjMcu6XEPYJ-q_bg6YGWxmoRmArQL3F4Y6PHJgU3ZClPS2bzChhAsV5xQ22CLwIaChS3DozjW1pp0diF2wt2bFlAwJUMJ87p-317cI8OZZA";

    // Animal facts AJAX
    $.ajax({
        url:  animalFactsURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });

    // Pet finder AJAX
    $.ajax({
        headers:{
            'Authorization': 'Bearer ' + petFinderAPI     
        },
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
