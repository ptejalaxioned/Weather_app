let button = document.querySelector(".search-button");
let card_area = document.querySelector(".card-area");
let card_area_wrapper = document.querySelectorAll(".wrapper")[1];
let serach_city = document.querySelector(".serach-city");

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let head = document.head.children;

button.addEventListener("click", () => {
  let childCount = card_area_wrapper.children.length;

  if (childCount == 0) {
    card_area.classList.toggle("card-area-onclick");
  }

  let city = serach_city.value;
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=en&q=";
  let apiKey = "f6462ef3aa1b7e148ef9577a7c0d5b46";

  if (serach_city.value !== "") {
    fetch(apiUrl + city + `&appid=` + apiKey)
      .then((response) => {
        if (response.status !== 404) {
          response.json().then((data) => {
            let heading = document.createElement("h2");
            let ul = document.createElement("ul");
            ul.classList.toggle("temp-list");
            card_area_wrapper.append(heading, ul);

            setTimeout(function () {
              card_area_wrapper.classList.add("card-wrapper-onclick");
            }, 500);

            for (let i = 0, j = 0; i < 39 && j < 5; i = i + 8, j++) {
              let city_name = data.city.name;
              let temp = data.list[i].main.temp;
              let icn = data.list[i].weather[0].main;
              let desc = data.list[i].weather[0].description;
              heading.innerText = city_name;

              let iconContent = "";
              if (icn == "Clouds") {
                iconContent = "f0c2";
                console.log(icn, iconContent);
              } else if (icn == "Clear") {
                iconContent = "e28f";
                console.log(icn, iconContent);
              } else if (icn == "Drizzle") {
                iconContent = "f738";
                console.log(icn, iconContent);
              } else if (icn == "Mist") {
                iconContent = "f74e";
                console.log(icn, iconContent);
              } else if (icn == "Rain") {
                iconContent = "f73d";
                console.log(icn, iconContent);
              } else if (icn == "Snow") {
                iconContent = "f739";
              }

              let content = "\\" + iconContent;

              const style = document.createElement("style");
              // Add the desired properties to the ::before pseudo-element
              style.textContent = `
  .icon::before {
  content: '${content}';
  margin-bottom: 15px;
  display: flex;
  font-size: 100px;
  font-family: "FontAwesome";
  font-weight: 100;
  text-indent: 0px;
}`;

              // Append the style element to the head of the document
              document.head.appendChild(style);

              let date = data.list[i].dt_txt;
              let str = date.toString();
              let x = new Date(str.substring(0, 10));

              let day = daysOfWeek[x.getDay()];

              let li = document.createElement("li");
              li.setAttribute("id", j);
              ul.appendChild(li);
              let span1 = document.createElement("span");
              span1.classList.toggle("city-name");
              span1.innerText = day;

              let divT = document.createElement("div");
              divT.classList.toggle("temprature");
              let div_span1 = document.createElement("span");
              div_span1.classList.toggle("temprature-span");
              div_span1.innerText = temp;
              let div_span2 = document.createElement("span");
              div_span2.classList.toggle("inside-temprature");
              div_span2.innerText = "°C";
              divT.append(div_span1, div_span2);

              let span2 = document.createElement("span");
              span2.classList.toggle("icon");
              span2.innerText = icn;

              let span3 = document.createElement("span");
              span3.classList.toggle("discription");
              span3.innerText = desc;

              li.append(span1, divT, span2, span3);

              while (card_area_wrapper.children.length > 2) {
                card_area_wrapper.removeChild(card_area_wrapper.children[0]);
              }
            }
          });
        } else {
          let error = document.createElement("div");
          error.classList.toggle("error-div");
          card_area_wrapper.appendChild(error);

          let oops = document.createElement("span");
          oops.innerText = "oops!";
          oops.classList.toggle("oops");
          let msg = document.createElement("span");
          msg.innerText = "invalid city name";
          error.append(oops, msg);
          setTimeout(function () {
            card_area_wrapper.classList.add("card-wrapper-onclick");
          }, 500);

          while (card_area_wrapper.children.length > 1) {
            card_area_wrapper.removeChild(card_area_wrapper.children[0]);
          }
        }
      })
      .catch((err) => {});
  } else {
    let error = document.createElement("div");
    error.classList.toggle("error-div");
    card_area_wrapper.appendChild(error);

    let oops = document.createElement("span");
    oops.innerText = "please!";
    oops.classList.toggle("oops");
    let msg = document.createElement("span");
    msg.innerText = "enter city name";
    error.append(oops, msg);
    setTimeout(function () {
      card_area_wrapper.classList.add("card-wrapper-onclick");
    }, 500);

    // Remove all child elements except the first one
    while (card_area_wrapper.children.length > 1) {
      card_area_wrapper.removeChild(card_area_wrapper.children[0]);
    }
  }
});

