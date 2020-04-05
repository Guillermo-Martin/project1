// Button functionality 
// target button 
var $submit = $('#submit');

// Add event listener
$submit.on('click', function() {
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
    var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDeXRQZVNycEZNZHhkUU9ac3Q3WFRmQ29lZjJRdlowQ1ZiZEJJZVVBUjhEaElkY3U1TiIsImp0aSI6IjA4ODk1OGExZjYzNzc0OWZhODUzMzlhMDk2ZmE2MTRjZmEwM2FjOGM1ZGU5OTgwNDQyMDAxMmRmOWIyNDZmZDcwMzkzYTQzNjI3OGFhOGY4IiwiaWF0IjoxNTg2MTA3NTA3LCJuYmYiOjE1ODYxMDc1MDcsImV4cCI6MTU4NjExMTEwNywic3ViIjoiIiwic2NvcGVzIjpbXX0.s72doeM-y31wvgWv1nfNbUEXFuk7extf1dbNe0tWae3qLyFXZSfrgaaARq5OKQzCPljwMis3VSjEPOUoi3bmRBLQsxWAr2gKOsh-bbtMmGgNz-NGHMVNHQdxc1JDZtZ7jEI6mUFV2F1a3WGB73DwT4lZdZ1o8BwNBcFVehgPB-gVfOFzg7fWEiJlmMCX6MVirX47M8dhbNXUkrHHHvKD4cKTLrBy9cCMiVfuDD66YZFM2OtzfTk5um-BGRVYjThgvVptB5ujzSMe9lWfz0Asy62rqqZEj3l9Qx3ySU-o5D8K6Ay27eLkFXsqpJdjczhvzeQCB5sgrfLBWxN1AMsOHw";

    // Animal facts AJAX
    $.ajax({
        url: animalFactsURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response[0].text);
        var aniFacts = response[0].text;
        facts.text(aniFacts);
        facts.append();
    });



    // Adoption info AJAX
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + petFinderAPI
        },
        url: petFinderURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);


        for (var i = 0; i < response.animals.length; i++) {

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
            if (response.animals[i].photos[0] !== undefined) {
                animalPic = response.animals[i].photos[0].large;
            }

            // console.log(response.animals[i].photos[0].large)
            // console.log(response.animals[i].photos.length)

            // if(parseInt(response.animals[i].photos.length) === 0){
            //     console.log("There's no picture");
            // }


                var animalURL = response.animals[i].url;


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
                    var $animalURL = $('<a>');
                    $animalURL.attr('href', animalURL);
                    var $animalPicEl = $('<img>');
                    $animalPicEl.attr("src", animalPic);
                    $animalURL.append($animalPicEl);
                    $adoptionData.append($animalURL);
                }
                
        }


    });
})