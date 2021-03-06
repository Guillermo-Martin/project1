// Button functionality
// target button
var $submit = $("#submit");

// placeholder image for when there's no animal pic available
var placeholder = "./assets/images/placeholder.jpg";

// Add event listener

$submit.on("click", function () {
  // empty the div when submit is clicked
  $("#adoptionData").empty();

  //set values for URLs
  var type = $("#type").val().toLowerCase();
  var facts = $("#facts");
  var location = $("#zipcode").val();

  // AJAX requests URLs
  // if i get cors error, prepend this:  https://cors-anywhere.herokuapp.com/ to the url (see animal facts example)
  var animalFactsURL = `https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random?animal_type=${type}&amount=2`;
  var petFinderURL = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=${type}&location=${location}`;
  var petFinderAPI =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJLQVlkTDNlVUNjR2V2b3hCdHJVYkM0NlE5N3lSY0sxdm5ET3AxWVZWaGlWRXFacEVhSCIsImp0aSI6IjE1NjIwYWRiNTQ0MWU0NWViMmE1NTgxNDA5ZjRlMjA1NjZlMWU3YWMxMGQ5ZjEzYzUzNDRkMzkyMjEwZGRmOTNiZDYyYTYyYWJlMmI2ODNiIiwiaWF0IjoxNTk5NzgwNDExLCJuYmYiOjE1OTk3ODA0MTEsImV4cCI6MTU5OTc4NDAxMSwic3ViIjoiIiwic2NvcGVzIjpbXX0.AyPCnTIN_U5Zd8MjBfJmNE9MSLtI1YAbVZrdurab9Z6s8mt8YOqNEniC8pOpR03h3uUWWfSrc6-8yaJ_-t_fOi457jZlwLnoxYpNrqCGOVtJ8KUNB6-_Kl6QHgQW-ST0EnuAtZ0IozChGhGFKT-lPJi_SJKA2wQr7cB2EUTAX4tpzZG1aKCkYZuDcehvwimTBenOxmKT20Mz5DPMyGkkWFKalInzupwec732a_vC3x5ls8lMKSBPieOFjqUjkasUTqXt7mtfjtpPTkHFEb__A4eYsJTIRTMajyYNYeRZ1nLmIU6vSHnSdVPq3VwrNHBP9wUeUKUozj7NLe3rdAi9iA";

  // Animal facts AJAX
  $.ajax({
    url: animalFactsURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response[0].text);
    var aniFacts = response[0].text;
    facts.text(aniFacts);
    facts.append();
  });

  // Adoption info AJAX
  $.ajax({
    headers: {
      Authorization: "Bearer " + petFinderAPI,
    },
    url: petFinderURL,
    method: "GET",
  }).then(function (response) {
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
      if (response.animals[i].photos[0] !== undefined) {
        // this is called "short circuiting"
        animalPic = response.animals[i].photos[0].large;
      } else {
        animalPic = placeholder;
      }

      // animal URL to get more info
      var animalURL = response.animals[i].url;

      // create the cards

      // create div with class row medium-unstack
      var $rowMediumUnstack = $("<div>");
      $rowMediumUnstack.addClass("row medium-unstack");
      $rowMediumUnstack.attr("id", "row-medium");
      $("#adoptionData").append($rowMediumUnstack);

      var $rowMedium = $("#row-medium");

      // create column medium-3 and append to row medium
      var $columnMed = $("<div>");
      $columnMed.attr("id", "columnMed");
      $columnMed.addClass("column medium-3");
      $rowMedium.append($columnMed);

      // create div class = card and append to column medium 3
      var $card = $("<div>");
      $card.attr("class", "card");
      $columnMed.append($card);

      // create card header and append to div class = card
      var $cardHeader = $("<div>");
      $cardHeader.attr("id", "card-header-1");
      $cardHeader.addClass("card-divider");
      $cardHeader.text(animalName);
      $card.append($cardHeader);

      // create card picture link
      var $cardLink = $("<a>");
      $cardLink.attr("href", animalURL);
      $cardLink.attr("target", "_blank");
      $cardHeader.append($cardLink);

      // create img tag and append to card
      var $cardImage = $("<img>");
      $cardImage.attr("id", "card-img-1");
      $cardImage.attr("src", animalPic);
      $cardLink.append($cardImage);

      // create card section with class = card-section and append to card
      var $cardSection = $("<div>");
      $cardSection.addClass("card-section");
      $card.append($cardSection);

      // create h4 and append to card-section (maybe use this to create more data)(breed)
      var $cardType = $("<h4>");
      $cardSection.append($cardType);
      $cardType.text("Type: " + animalType);

      // this is age
      var $cardAge = $("<h4>");
      $cardSection.append($cardAge);
      $cardAge.text("Age: " + animalAge);

      // this is age
      var $cardGender = $("<h4>");
      $cardSection.append($cardGender);
      $cardGender.text("Gender: " + animalGender);

      // create h4 and append to card-section (maybe use this to create more data)(breed)
      var $cardBreed = $("<a>");
      $cardSection.append($cardBreed);
      $cardBreed.attr("target", "_blank");
      $cardBreed.text("Breed: " + animalBreed);

      // create card-div and append to card-section
      var $cardDiv = $("<div>");
      $cardDiv.attr("id", "card-div-1");
      $cardSection.append($cardDiv);
      $cardDiv.text("About: " + animalDescription);

      // write if statements for dog, short and long-haired cats
      if (animalType === "Dog" && animalBreed === "Chihuahua") {
        $cardBreed.attr(
          "href",
          "https://en.wikipedia.org/wiki/Chihuahua_(dog)"
        );
      } else if (animalType === "Dog" && animalBreed === "Black_Labrador_Dog") {
        $cardBreed.attr(
          "href",
          "https://en.wikipedia.org/wiki/Labrador_Retriever"
        );
      } else if (animalType === "Dog" && animalBreed === "Sheperd") {
        $cardBreed.attr(
          "href",
          "https://en.wikipedia.org/wiki/German_Shepherd"
        );
      } else if (animalType === "Dog") {
        $cardBreed.attr("href", `https://en.wikipedia.org/wiki/${animalBreed}`);
      } else if (
        animalType === "Cat" &&
        animalBreed === "Domestic Short Hair"
      ) {
        $cardBreed.attr(
          "href",
          "https://en.wikipedia.org/wiki/Domestic_short-haired_cat"
        );
      } else if (animalType === "Cat" && animalBreed === "Domestic Long Hair") {
        $cardBreed.attr(
          "href",
          "https://en.wikipedia.org/wiki/Domestic_long-haired_cat"
        );
      } else if (
        animalType === "Cat" &&
        animalBreed === "Domestic Medium Hair"
      ) {
        $cardBreed.attr(
          "href",
          "https://trupanion.com/breeds/cat/domestic-medium-hair"
        );
      } else if (animalType === "Cat") {
        $cardBreed.attr(
          "href",
          `https://en.wikipedia.org/wiki/${animalBreed}_cat`
        );
      }

      // write if statement for when description isn't available
      if (animalDescription) {
        $cardDiv.html("About: " + `${animalDescription}`);
      } else {
        $cardDiv.html("About: " + "Unavailable");
      }
    }
  });
});
