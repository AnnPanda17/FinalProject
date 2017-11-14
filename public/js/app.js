var fire = {
  apiKey: config.firebaseAPI,
  authDomain: "final-project-27116.firebaseapp.com",
  databaseURL: "https://final-project-27116.firebaseio.com",
  projectId: "final-project-27116",
  storageBucket: "final-project-27116.appspot.com",
  messagingSenderId: "440144855071"
};
firebase.initializeApp(fire);
let messageAppReference = firebase.database();

$('.now').click(function() {
  console.log('clicked');
  getLocation();
});

$('.pup').click(function() {
  console.log('clicked');
  getLocation();
});

var petFinderKey = config.petFinderAPI;
var animalURl = 'https://api.petfinder.com/pet.find?key=' + petFinderKey + '&location=94133';
console.log(animalURl);
// $.getJSON(animalURl, function(data) {
//   console.log(data);
// });

function getAnimals(zipCode) {

  $.getJSON('https://api.petfinder.com/pet.find?format=json&key=' + petFinderKey + '&callback=?&location=' + zipCode + '&animal=dog&count=25&age=baby')
    .done(function(petApiData) {
      $('h1').html('PLEASE ADOPT ME');
      var post = "";

      let messagesReference = messageAppReference.ref('messages');
      messagesReference.remove();
      // post to fire base and pull first four.. do show me more to add more into website
      for (i = 0; i < petApiData.petfinder.pets.pet.length; i++) {



        var objs = petApiData.petfinder.pets.pet[i].media.photos.photo;
        var result = objs.filter(function(obj) {
          return obj['@size'] === 'pn';
        });
        messagesReference.push({
          name: petApiData.petfinder.pets.pet[i].name.$t,
          age: petApiData.petfinder.pets.pet[i].age.$t,
          size: petApiData.petfinder.pets.pet[i].size.$t,
          img: result[0].$t,
        });

      }
      messageAppReference.ref('messages').on('value', function(results) {
        let messages = [];

        let allMsgs = results.val();

        var keys = Object.entries(allMsgs);

        for (var j = 0; j < 4; j++) {

          post = `
            <div class="box2">
              <img class="img2" src="${keys[j][1].img}"></img>
              <div class="name">${keys[j][1].name}</div>
              <div class="age">${keys[j][1].age}</div>
              <div class="size">${keys[j][1].size}</div>
            </div>`
          $('.animalPosts').append(post);
        }

      });
      //$('.forecast').append('<button class="pups">MORE PUPPERS PLEZ</button>');

    })

    .error(function(err) {
      alert('Error retrieving data!');
    });

};

function getWeather(link) {
  $.getJSON(link, function(data) {

    //set weather id & icon
    var id = data.weather[0].id;
    var icon = data.weather[0].icon;

    $('#weather-id').text(id);
    $('#weather-icon').text(icon);
    var description = '';
    // Switch code for description
    //getPicture(id); // create this function so its not in main function. MAD MAPPING
    console.log(typeof id + id);
    switch (id) {
      case 200:
          description = "thunderstorm with light rain";
        break;  
      case 201:
          description = "thunderstorm with rain";
        break;  
      case 202:
          description = "thunderstorm with heavy rain"; 
        break;  
      case 210:
          description = "light thunderstorm"; 
        break;  
      case 211:
          description = "thunderstorm";
        break;  
      case 212:
          description = "heavy thunderstorm";
        break;  
      case 221:
          description = "ragged thunderstorm"; 
        break;  
      case 230:
          description = "thunderstorm with light drizzle"; 
        break;  
      case 231:
          description = "thunderstorm with drizzle"; 
        break;  
      case 232:
          description = "thunderstorm with heavy drizzle"; 
        break;  
      case 300:
          description = "light intensity drizzle"; 
        break;  
      case 301:
          description = "drizzle"; 
        break;  
      case 302:
          description = "heavy intensity drizzle"; 
        break;  
      case 310:
          description = "light intensity drizzle rain"; 
        break;  
      case 311:
          description = "drizzle rain"; 
        break;  
      case 312:
          description = "heavy intensity drizzle rain"; 
        break;  
      case 313:
          description = "shower rain and drizzle"; 
        break;  
      case 314:
          description = "heavy shower rain and drizzle"; 
        break;  
      case 321:
          description = "shower drizzle"; 
        break;  
      case 500:
          description = "light rain"; 
        break;  
      case 501:
          description = "moderate rain"; 
        break;  
      case 502:
          description = "heavy intensity rain"; 
        break;  
      case 503:
          description = "very heavy rain"; 
        break;  
      case 504:
          description = "extreme rain"; 
        break;  
      case 511:
          description = "freezing rain"; 
        break;  
      case 520:
          description = "light intensity shower rain"; 
        break;  
      case 521:
          description = "shower rain"; 
        break;  
      case 522:
          description = "heavy intensity shower rain"; 
        break;  
      case 531:
          description = "ragged shower rain"; 
        break;  
      case 600:
          description = "light snow"; 
        break;  
      case 601:
          description = "snow"; 
        break;  
      case 602:
          description = "heavy snow"; 
        break;  
      case 611:
          description = "sleet"; 
        break;  
      case 612:
          description = "shower sleet"; 
        break;  
      case 615:
          description = "light rain and snow"; 
        break;  
      case 616:
          description = "rain and snow"; 
        break;  
      case 620:
          description = "light shower snow"; 
        break;  
      case 621:
          description = "shower snow"; 
        break;  
      case 622:
          description = "heavy shower snow"; 
        break;  
      case 701:
          description = "mist"; 
        break;  
      case 711:
          description = "smoke"; 
        break;  
      case 721:
          description = "haze"; 
        break;  
      case 731:
          description = "sand, dust whirls"; 
        break;  
      case 741:
          description = "fog"; 
        break;  
      case 751:
          description = "sand"; 
        break;  
      case 761:
          description = "dust"; 
        break;  
      case 762:
          description = "volcanic ash"; 
        break;  
      case 771:
          description = "squalls"; 
        break;  
      case 781:
          description = "tornado"; 
        break;  
      case 800:
          description = "clear sky"; 
        break;  
      case 801:
          description = "few clouds"; 
        break;  
      case 802:
          description = "scattered clouds"; 
        break;  
      case 803:
          description = "broken clouds"; 
        break;  
      case 804:
          description = "overcast clouds"; 
        break;
      case 900:
        description = "tornado"; 
        break;  
      case 901:
          description = "tropical storm"; 
        break;  
      case 902:
          description = "hurricane"; 
        break;  
      case 903:
          description = "cold"; 
        break;  
      case 904:
          description = "hot"; 
        break;  
      case 905:
          description = "windy"; 
        break;  
      case 906:
          description = "hail"; 
        break;  
      case 951:
          description = "calm"; 
        break;  
      case 952:
          description = "light breeze"; 
        break;  
      case 953:
          description = "gentle breeze"; 
        break;  
      case 954:
          description = "moderate breeze"; 
        break;  
      case 955:
          description = "fresh breeze"; 
        break;  
      case 956:
          description = "strong breeze"; 
        break;  
      case 957:
          description = "high wind, near gale"; 
        break;  
      case 958:
          description = "gale"; 
        break;  
      case 959:
          description = "severe gale"; 
        break;  
      case 960:
          description = "storm"; 
        break;  
      case 961:
          description = "violent storm"; 
        break;  
      case 962:
          description = "hurricane"; 

      default:
        description = "no weather here";
    }

    console.log(id + description);

    var img = "img/" + icon + ".jpg";
    $('.coverimg').attr('src', img);
    $('#description').text(description.toUpperCase());


    //get weather description
    var tempCelcius = data.main.temp - 273.15;
    var tempFahrenheit = tempCelcius * 9 / 5 + 32;

    var description = data.weather[0].description;
    console.log(tempCelcius);
    $('#locationDisplay').text(data.name);


    if ($("#Celsius").is(':checked')) {

      console.log('checked');
      $('.temperature').text(Math.round(tempCelcius));
      $('#degree').html('&deg;C?!');
    } else {
      $('.temperature').text(Math.round(tempFahrenheit));
      $('#degree').html('&deg;F?!');
    }


    // much initialise such doge
    $($.doge);
  });
}

// if there is not temperature dont do anything
$('#Celsius').click(function() {
  $('#txtBox').val('✔');
  console.log("change me!");
  if ($('.temperature').html() != 'Weather Doggos') {
    if ($("#Celsius").is(':checked')) {
      var temp = $('.temperature').html()
      var newTemp = (temp - 32) / 1.8;
      $('.temperature').html(Math.round(newTemp));
      $('#degree').html('&deg;C?!');
      console.log('checked' + $('.temperature').html());
      //$('.temperature').text(Math.round(tempCelcius));
    } else {
      var temp = $('.temperature').html()
      var newTemp = temp * 9 / 5 + 32;
      $('.temperature').html(Math.round(newTemp));
      $('#degree').html('&deg;F?!');
      console.log('checked' + $('.temperature').html());
      //$('.temperature').text(Math.round(tempFahrenheit));
    }
  }
});

$('.pups').click(function() {
  messageAppReference.ref('messages').on('value', function(results) {
    let messages = [];

    let allMsgs = results.val();
    let box2Length = $('.box2').length;
    console.log(box2Length);
    var keys = Object.entries(allMsgs);
    //console.log(JSON.stringify(keys));
    if (box2Length > 0) {
      for (var j = box2Length; j < (box2Length + 4); j++) {

        post = `
          <div class="box2">
            <img class="img2" src="${keys[j][1].img}"></img>
            <div class="name">${keys[j][1].name}</div>
            <div class="age">${keys[j][1].age}</div>
            <div class="size">${keys[j][1].size}</div>
          </div>`
        $('.animalPosts').append(post);
        // if (j = 25) {
        //   $('.pups').html('View more on our website!');
        // }
      }
    }


  });
});



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, function(error) {});
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}


function showPosition(position) {
  var weatherAPI = config.weatherAPI;
  var url = 'https://api.openweathermap.org/data/2.5/weather';
  url += '?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&APPID=' + weatherAPI + '&callback=?';
  console.log(position);
  $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false', function(results) {
    console.log(results.results[0].address_components);
    var objs = results.results[0].address_components;
    var postalCode = objs.filter(function(obj) {
      return obj.types[0] === 'postal_code';
    });
    getAnimals(postalCode[0].short_name);


  });



  getWeather(url);
}
