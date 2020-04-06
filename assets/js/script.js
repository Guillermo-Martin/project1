// Button functionality 
// target button 
var $submit = $('#submit');

var placeholder = "./assets/images/placeholder.jpg";

// Add event listener
$submit.on('click', function(){

    // empty the div when submit is clicked
    $('#adoptionData').empty();
    
    //set values for URLs
    var type = $("#type").val().toLowerCase();
    var facts = $("#facts");
    var location = $('#zipcode').val();
    
    // AJAX requests URLs
    // if i get cors error, prepend this:  https://cors-anywhere.herokuapp.com/ to the url (see animal facts example)
    var animalFactsURL = `https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random?animal_type=${type}&amount=2`;
    var petFinderURL = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=${type}&location=${location}`;
    var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDeXRQZVNycEZNZHhkUU9ac3Q3WFRmQ29lZjJRdlowQ1ZiZEJJZVVBUjhEaElkY3U1TiIsImp0aSI6IjNjYzI4YzYyZjA1ODY2N2IzYzExNWJjMWFmMTAzNmI4MzA1YjFiMzJiMzU3YzRlOGFkZmI0Y2JlMTc4OGM5MzhkMTNiYmQyZTY0MzJhZGM3IiwiaWF0IjoxNTg2MjA0NTg5LCJuYmYiOjE1ODYyMDQ1ODksImV4cCI6MTU4NjIwODE4OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Uv80XhIdqntIJ4dZ3rbJQXIMmd_J9wUFOG22v4XITVQ4wbujK6j4K9v6NNMB2LBs4GnnUjy4etyeMBC3E9FPDz_KIZPHF1ZBO7d1EIhBAXkKmawAxx0HHcp3-wAqP073TyR9vmet9S800PuRB6a_43g_fC1D7ieJFxBXG_ukMfUY7lmPRKkMFueq6P7FRrzRsAKP2Cj6cJ65YEtcK0nRIqnhAXaW-yz53RPeF1vyAiiJssdEv18qvylmlE2uI91KeplusP40CQfc2KzD72FcguQuHYgP8YapOBT2RCNiV7MXy8QK2phGWaadKzw1uoyqMl2Fd7ez4k53ICqMDFXxLA";

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
                var animalPic; // try setting this to null (try this first)
                
                // if the animal picture exists, store it in animalPic
                if(response.animals[i].photos[0] !== undefined){
                    // this is called "short circuiting"
                    animalPic = response.animals[i].photos[0].large;
                } else {
                    animalPic = placeholder;
                    // animalPic = null; (try this second)
                    // $animalPicEl.attr("src", "https://i.pinimg.com/originals/b8/be/0e/b8be0e0e188abc4169051df8b1a90a76.jpg");
                    // var $animalURL = $('<a>');
                    // $animalURL.attr('href', "https://i.pinimg.com/originals/b8/be/0e/b8be0e0e188abc4169051df8b1a90a76.jpg");
                    // var $animalPicEl = $('<img>');
                    // $animalPicEl.attr("src", animalPic);
                    // $animalURL.append($animalPicEl);
                    // $adoptionData.append($animalURL);
                }
                
                // animal URL to get more info
                var animalURL = response.animals[i].url;


            // create the elements to put into the html
                var $animalTypeEl = $('<h2>');
                var $animalBreedEl = $('<p>');
                var $animalAgeEl = $('<p>');
                var $animalDescriptionEl = $('<p>');
                var $animalName = $('<p>');
                var $animalGender = $('<p>');
                
                
            if(animalDescription){
                $animalDescriptionEl.html("Description: " + `${animalDescription}`);
            } else {
                $animalDescriptionEl.html("Description: " + `${animalDescription}`);
            }
            
            // add text to the elements
            $animalName.text("Name: " + animalName);
            $animalTypeEl.text("Type: " + animalType);
            $animalBreedEl.text("Breed: " + animalBreed);
            $animalAgeEl.text("Age: " + animalAge);
            $animalGender.text("Gender: " + animalGender);
            

            // console.log(animalDescription.replace("\'", "\\\'"));
            
            


            // appending to the div 

                var $adoptionData = $('#adoptionData');

                // add picture to html    
                // if(animalPic){
                    var $animalURL = $('<a>');
                    $animalURL.attr('href', animalURL);
                    $animalURL.attr('target', "_blank");
                    var $animalPicEl = $('<img>');
                    $animalPicEl.attr("src", animalPic);
                    $animalURL.append($animalPicEl);
                    $adoptionData.append($animalURL);
                // }
            
                $adoptionData.append($animalName);
                $adoptionData.append($animalTypeEl);
                $adoptionData.append($animalBreedEl);
                $adoptionData.append($animalGender);
                $adoptionData.append($animalAgeEl);
                $adoptionData.append($animalDescriptionEl);
                

                
            
                     
        }

    });
})