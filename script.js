function element(country, classname, id, text){
   let crtag = document.createElement(country);
   crtag.classList = classname;
   crtag.id =id;
   crtag.innerHTML = text;
   return crtag;
 }
 
 
 let container = element("div", "container","", "");
 const h1 = element("h1", "text-center", "title", "Rest Countries Weather From API");
 const row = element("div", "row", "", "");
 
 const response = fetch("https://restcountries.com/v3.1/all");
 response
 .then((data)=> data.json())
 .then((card1)=>{
   for(let i=0;i <card1.length;i++){
      const col = document.createElement("div");
      col.classList ="col-sm-6 col-md-4 col-lg-4 col-xl-4";
 col.innerHTML =`
 <div class= "card h-100">
 <div class="card-header">
 <h5 class = "card-title text-center">${card1[i].name.common}</h5>
 </div>
 <div class = "img-box">
 <img src="${card1[i].flags.png}" class="card-img-top" alt="..."/>
 </div>
 <div class = "card-body">
 <div class="card-text text-center">Region: ${card1[i].region}</div>
 <div class="card-text text-center">Capital: ${card1[i].capital}</div>
 <div class="card-text text-center">Countrycode: ${card1[i].cca3}</div>
 <div class="card-text text-center">Population: ${card1[i].population}</div>
 
 <button class = "btn btn-primary" Onclick = "getWeatherData('${card1[i].name.common}',${i})"> Click Here for Weather</button>
 <p class ="weatherInfo-${i}"></p>
 <div class="some-class"></div>
 </div>
 </div>`;
 row.append(col);
   }
   let btns = document.querySelectorAll("button");
   btns.forEach((btn, index)=>{
     btn.addEventListener("click",()=>{
       let latlng = card1[index].latlng;
       let lat = latlng[0];
       let lng = latlng[1];
                                                 
       let weatherAPI = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=429a23dee47c5972025ec631391cc139&units=metric`);
          weatherAPI
          .then((data)=> data.json())
          .then((value)=>         
 alert( `Weather of ${card1[index].name.common} is ${Math.floor(value.main.temp)}°C`)         
          );

     });
   });
 
 });
 document.body.append(h1,container);
 container.append(row);