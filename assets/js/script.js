// Button functionality 
// target button 
var $submit = $('#submit');

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
    var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDeXRQZVNycEZNZHhkUU9ac3Q3WFRmQ29lZjJRdlowQ1ZiZEJJZVVBUjhEaElkY3U1TiIsImp0aSI6ImY2ZDU0OWQxODgxNmI2OGQ3Y2UxODg5NDgyNzljNDJhODA5MmJjNmUzMTZmZDZlNjI0MjIxZGI3OTZmNTlmZTYwYzBiYWY4ZDBkN2RiZGU2IiwiaWF0IjoxNTg2MTI0MTAwLCJuYmYiOjE1ODYxMjQxMDAsImV4cCI6MTU4NjEyNzcwMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.nl6FpP5dGC4UCGn_Bgyw7y4c43c7ky9OT4ls8LLHMw1QRqfu0zzelJpRDlLgaEtXFebUVBc6Uqwg_Q3Rw4g2Ph4NBIptfL228sFl1o3FLVlLQRwubZd8-sZEDYFPeVo9fHyEmFOjOixwSRLw7Nkv6Ppi4Z3XidKVa7is2ecVMhlpmM4AdzLWpylsyVWjWXkOFXVMGG00URXzcgP0n9ZXJ4OzJLWD-LwE9L3dppe1CloKodIirHzcw4NMCQQWN2UPun-JAs8je4I_1PQoQlG6YGvI6QYFetQ61fvgifNkL5btzAMyG4lM1JTWVykkTfZXFci2iNAqz0DzKb63NTG9GA";

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
                
                // if the animal picture exists, store it in animalPic
                if(response.animals[i].photos[0] !== undefined){
                    animalPic = response.animals[i].photos[0].large;
                }   // else {
                    // $animalPicEl.attr("src", "https://i.pinimg.com/originals/b8/be/0e/b8be0e0e188abc4169051df8b1a90a76.jpg");
                    // var $animalURL = $('<a>');
                    // $animalURL.attr('href', "https://i.pinimg.com/originals/b8/be/0e/b8be0e0e188abc4169051df8b1a90a76.jpg");
                    // var $animalPicEl = $('<img>');
                    // $animalPicEl.attr("src", animalPic);
                    // $animalURL.append($animalPicEl);
                    // $adoptionData.append($animalURL);
                // }
                
                // animal URL to get more info
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

                
            // add picture to html    
                if(animalPic){
                    var $animalURL = $('<a>');
                    $animalURL.attr('href', animalURL);
                    $animalURL.attr('target', "_blank");
                    var $animalPicEl = $('<img>');
                    $animalPicEl.attr("src", animalPic);
                    $animalURL.append($animalPicEl);
                    $adoptionData.append($animalURL);
                }
                     
        }

    });
})