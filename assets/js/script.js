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
    // var petFinderURL = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=${type}`;
    // var petFinderAPI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDeXRQZVNycEZNZHhkUU9ac3Q3WFRmQ29lZjJRdlowQ1ZiZEJJZVVBUjhEaElkY3U1TiIsImp0aSI6IjU3YjFmM2RmZDNmOWQwZjRjNDVlZmViZjZiMTE1YzE5ODExZWUwM2EyNzQyY2RmZmZiNTViNDFiYTMyYzk5ZTI5ODhkOGM1NzIyZWE5ZjY5IiwiaWF0IjoxNTg2MDIxODc2LCJuYmYiOjE1ODYwMjE4NzYsImV4cCI6MTU4NjAyNTQ3Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.VtfLrp9jTkVW8O28fy-Nv4OZrVGE67efTL2XV1BEK5pZuJcoH8EEMztcj3__ARjO9jIxbE4rZ25zVEiHzVgab6PE6WZID6RgL3qxHy5Noyw28jbOsaHEvAk7-5-Iwkmn4P7zR7goEyKzHPdy-dxQvplwI0TmnoqioTh_3SY_TOYn7Gm5H7MR15bkHZ1s8Ab512PRxl84UyFKgUiF2OkpH-Ey1zJLwNmAT0Cg9DAezDaBjAaP0Z-Kcs_dN3Zhf9mGJ09WDe8OAzEOaB0Sjl1p5DW0C2xzfZ65sp-iDvtllSTRG5_XMHlHDwTlkKMQJ6m63UWlYKlq6wEstdOh7PjKeQ";

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
//if user selects cat, then next dropdown box will show cat breeds
//create for loop for response








