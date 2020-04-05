// Button functionality 
// target button 
var $submit = $('#submit');

// Add event listener
$submit.on('click', function(){
    // Pet finder AJAX
    //set values for user input
    var type = $("#type").val().toLowerCase();
    var breed = $("#type1").val();
    var age = $("#age").val();
    var facts = $("#facts");
    // console.log("You clicked on the submit button!");
    // AJAX request for animal facts
    // if i get cors error, prepend this:  https://cors-anywhere.herokuapp.com/ to the url (see animal facts example)
    var animalFactsURL = `https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random?animal_type=${type}&amount=2`;
    var petFinderURL = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=${type}`;
    var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDeXRQZVNycEZNZHhkUU9ac3Q3WFRmQ29lZjJRdlowQ1ZiZEJJZVVBUjhEaElkY3U1TiIsImp0aSI6IjAwMTc3MGYyOWFjZWExODcwOTM4YmMwMWY5MmYyNWYyYTYzNTY2MzU3YjI5Yzk2NzcxNzVkYjUwMjBiMWYwYTM1ZmIzZTFiY2IwOTEyYzQ1IiwiaWF0IjoxNTg2MDYwNzA1LCJuYmYiOjE1ODYwNjA3MDUsImV4cCI6MTU4NjA2NDMwNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.pMAUCbapaq5SUGFFRSisbR3mCVWRVxdfRKqSV1Tek8uSNlHTrbQxTTiaRw4pSei4vHRmBMLJ1egcxm9Qw7V-8VXdwJHe_yQ4VZDZ9HJD114mwnaupWssx8Ae6NvDFRrCh1YEods7SBcEHHQpcXhh-UUHlQmyJtQ_8gBgYUuVS4Oy4NTlKvqunpD2F2ERej__ZlRQeDvmZlrXTMHvYWX83v8z9QqbVuKxkDPDolJQBJlhCzwIadArBX0zmMrmPXaK9QAhxs5NomvoaSNp2P2uGYuxoxj5DfkbeSZIvS-l0km4x8mcCWuS7iyaoPYJRYpA_226tBBDGBxZWt1d3RUUfg";

    // Animal facts AJAX
    $.ajax({
        url:  animalFactsURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(response[0].text);
        var aniFacts = response[0].text;
        facts.text(aniFacts);
        facts.append();
    });
    
    

    // Adoption info AJAX
    $.ajax({
        headers:{
            'Authorization': 'Bearer ' + petFinderAPI     
        },
        url:  petFinderURL,
        method: "GET"
    }).then(function(response){
        console.log(response);


        for(var i = 0; i < response.animals.length; i++){

            // gather all the data
                // animal type
                var animalType = response.animals[i].type;
                // animal breed
                var animalBreed = response.animals[i].breeds.primary;
                // animal age
                var animalAge = response.animals[i].age;
                // animal description
                var animalDescription = response.animals[i].description;
                // animal name
                var animalName = response.animals[i].name;
                // animal gender
                var animalGender = response.animals[i].gender;
                // animal picture
                var animalPic;
                //if(response.animals[i].photos === 0)
                if(response.animals[i].photos[0] !== undefined){
                    animalPic = response.animals[i].photos[0].large;
                }
                
                // console.log(response.animals[i].photos[0].large)
                // console.log(response.animals[i].photos.length)

                // if(parseInt(response.animals[i].photos.length) === 0){
                //     console.log("There's no picture");
                // }


            // create the elements to put into the html
                var $animalTypeEl = $('<h2>');
                var $animalBreedEl = $('<p>');
                var $animalAgeEl = $('<p>');
                var $animalDescriptionEl = $('<p>');
                var $animalName = $('<p>');
                var $animalGender = $('<p>');
                

            // add text to the elements
                $animalTypeEl.text(animalType);
                $animalBreedEl.text(animalBreed);
                $animalAgeEl.text(animalAge);
                $animalDescriptionEl.text(animalDescription);
                $animalName.text(animalName);
                $animalGender.text(animalGender);
                

            // appending to the div 
                var $adoptionData = $('#adoptionData');
            
                $adoptionData.append($animalTypeEl);
                $adoptionData.append($animalBreedEl);
                $adoptionData.append($animalAgeEl);
                $adoptionData.append($animalDescriptionEl);
                $adoptionData.append($animalName);
                $adoptionData.append($animalGender);
                
                if(animalPic){
                    var $animalPicEl = $('<img>');
                    $animalPicEl.attr("src", animalPic);
                    $adoptionData.append($animalPicEl);
                }
                
                
        }


    });
})