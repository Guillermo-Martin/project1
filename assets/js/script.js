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
    var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDeXRQZVNycEZNZHhkUU9ac3Q3WFRmQ29lZjJRdlowQ1ZiZEJJZVVBUjhEaElkY3U1TiIsImp0aSI6ImZjZDE2NjAyNDQ1OWQ3YzRmYWEzOGU1ZTM2ZDE2MDE3MmEzZGE5YjlmNjZkOWQ3YjlkMzM4MzA0NzBkNGJjN2NlZDYwNzVjNTE2YzRlNDA1IiwiaWF0IjoxNTg2MTk2OTI1LCJuYmYiOjE1ODYxOTY5MjUsImV4cCI6MTU4NjIwMDUyNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.ZJ0U9YkVjVPggUs_7IMxfosZdZGm8neulgaN1h82RlLs85yUOtrkXBVFlTnqNkem-vntXo5-I_-xsy7tmmKY-sPYrMUZJ1YvwedhERGLbFD0MFLKC1tAT-ZNQY-8HGc6gdk1NWslpNsHDSwsYASA8cZGKoDIyLMLuabetq_ai05Wh1xHrLK714gv-lFcSL0kc1X5KYksQTUReieq-FZ6MFU2L_bllkVs0enf1KPiU0DA4mCJyNptHezrsgsGvbcoB-9g7luwKjVcGn_ozgo0PKz-Scdf6LFjpVzKR-piOkoiqyGVCmVqsSheTgxykfUH8izumAL_65IjJ19sZH6WKw";

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
                
                
            // add text to the elements
            $animalTypeEl.text(animalType);
            $animalBreedEl.text(animalBreed);
            $animalAgeEl.text(animalAge);

            if(animalDescription){
                $animalDescriptionEl.html(`${animalDescription.toString()}`);
            } else {
                $animalDescriptionEl.html(`${animalDescription}`);
            }
            
            


            // console.log(animalDescription.replace("\'", "\\\'"));
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
                // if(animalPic){
                    var $animalURL = $('<a>');
                    $animalURL.attr('href', animalURL);
                    $animalURL.attr('target', "_blank");
                    var $animalPicEl = $('<img>');
                    $animalPicEl.attr("src", animalPic);
                    $animalURL.append($animalPicEl);
                    $adoptionData.append($animalURL);
                // }
                     
        }

    });
})