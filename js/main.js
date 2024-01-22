let finalResponse ={};
let cartona;
content = document.getElementById("content")
async function getWeather(cityName){

    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e46b23933a194dd498b143950241901&q=${cityName}&days=3`)
    if (response.status==400){
        content.classList.remove("justify-content-evenly");
        content.classList.add("justify-content-center");
        cartona="";
        cartona+=`
        <div class="weather px-5">
            <div class="weather-info">
                <div class="weather-desc ">
                    <img src='images/404.png' class="errorImage mb-3">
                    <p  id="description">Oops! Location not found</p>
                </div>
            </div>

            </div>
    
        `
        
        content.innerHTML= cartona;

    } 
     
  
    else if( response.status == 200){
        finalResponse = await response.json();
        let weatherArray = finalResponse.forecast.forecastday;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let cityDate = new Date(`${finalResponse.location.localtime}`);
        let cartona="";
        content.classList.add("justify-content-evenly");
        content.classList.remove("justify-content-center");
    for(let i=0;i<weatherArray.length;i++){
        cartona+=`
            <div class="weather col-lg-4 col-md-6 col-sm-12">
            <p id="date" class="text-center">${cityDate.getDate()+i +" "+ months[cityDate.getMonth()] +" "+ cityDate.getFullYear()}</p>
            <div class="weather-info">
                <div class="weather-desc ">
                    <img src="${weatherArray[i].day.condition.icon ? 'http:'+ weatherArray[0].day.condition.icon : 'images/404.png'}" alt="" class="image">
                    <p  id="tempreture">${weatherArray[i].day.avgtemp_c + `<span>&deg;C</span>`}</p>
                    <p  id="description">${weatherArray[i].day.condition.text}</p>
                </div>
            </div>
            <div class="weatherDeepDetails">
                <div class="humidity">
                    <i class="fa-solid fa-water"></i>            
                    <div class="humidity-details">
                        <span id="humidity">${weatherArray[i].day.avghumidity}%</span>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="wind">
                    <i class="fa-solid fa-wind"></i>            
                    <div class="wind-details">
                        <span id="windSpeed">${weatherArray[i].day.maxwind_kph}km/h</span>
                        <p>wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
        `

        }
        content.innerHTML= cartona;
}

    
  }

function display (){
    let searchIcon = document.getElementById("searchIcon");
    searchIcon.addEventListener('click' , function(){
    let cityInput = document.getElementById("cityInput")
    let cityName = cityInput.value ;
    getWeather( cityName);
  })
}

display()