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
    var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJLakNOeEhOazAyMXdaVERIZ05RUFlEb0QxYm1yQmYwNFRsRmZmMVRyYTFNSlJLeXhOSSIsImp0aSI6IjgwN2I4OGFjYmNmZDVhMGE4MGNlYWM1Nzc1YjMyMjNhMWQ3MzgwMGQxNjk3OGQ0ZmQ5ZDA0NzJiYWY1OWVlOTIxYjA5ODYyY2EzNTM4YWQ3IiwiaWF0IjoxNTg2MjMyMDIyLCJuYmYiOjE1ODYyMzIwMjIsImV4cCI6MTU4NjIzNTYyMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.ndmGISiqgAj-2XjZAs1osxiELuEa9sNtfSezvAKAVM3V2rYnDzHPoFsfvHrB_xt9d7PAhKtWe2j7cxSiZXJTS8WS_j-iB_c2CusL-r_-2vZpiZZgtffe5RNaLt_oSm0dwiDM-CqDliPBaJt3j68QQZGx6yhAW2h4AO9squmjbuc8Pi40auBBsh9tB14u-aXJMiEtUqKC5dYKT7Hb7R8ckg55sGVhExqoR97aMf3zNy8VwA9fSVHOhELQkezdQjbRsMHlTkL97GaheFbjSni168yLA3N2WBc6-P5T67_E39HVdHgjmQ2LjM9dPNUEi3rxI0cuR_fTmbs27Y7WIuXi6A";

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
                var $animalBreedEl = $('<a>');
                var $animalAgeEl = $('<p>');
                var $animalDescriptionEl = $('<p>');
                var $animalName = $('<p>');
                var $animalGender = $('<p>');

                // write if statements for dog, short and long-haired cats
                if(animalType === "Dog" && animalBreed === "Chihuahua"){
                    $animalBreedEl.attr("href", "https://en.wikipedia.org/wiki/Chihuahua_(dog)");
                } else if(animalType === "Dog"){
                    $animalBreedEl.attr("href", `https://en.wikipedia.org/wiki/${animalBreed}`);
                } else if(animalType === "Cat" && animalBreed === "Domestic Short Hair"){
                    $animalBreedEl.attr("href", "https://en.wikipedia.org/wiki/Domestic_short-haired_cat");
                } else if(animalType === "Cat" && animalBreed === "Domestic Long Hair"){
                    $animalBreedEl.attr("href", "https://en.wikipedia.org/wiki/Domestic_long-haired_cat");
                } else if(animalType === "Cat" && animalBreed === "Domestic Medium Hair"){
                    $animalBreedEl.attr("href", "https://trupanion.com/breeds/cat/domestic-medium-hair");
                } else if(animalType === "Cat"){
                    $animalBreedEl.attr("href", `https://en.wikipedia.org/wiki/${animalBreed}_cat`);
                } 
                

                
                
            if(animalDescription){
                $animalDescriptionEl.html("Description: " + `${animalDescription}`);
            } else {
                $animalDescriptionEl.html("Description: " + "Unavailable");
            }
            
            // add text to the elements
            $animalName.text("Name: " + animalName);
            $animalTypeEl.text("Type: " + animalType);
            $animalBreedEl.text("Breed: " + animalBreed);
            // $animalBreedLink.text("Breed: " + animalBreed);
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
                // $adoptionData.append($animalBreedLink)
                $adoptionData.append($animalBreedEl);
                $adoptionData.append($animalGender);
                $adoptionData.append($animalAgeEl);
                $adoptionData.append($animalDescriptionEl);
                

                
            
                     
        }

    });
})