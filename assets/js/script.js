let button = document.querySelector(".search-button");
let card_area = document.querySelector(".card-area");
let card_area_wrapper = document.querySelectorAll(".wrapper")[1];
let serach_city = document.querySelector(".serach-city");


let childCount = card_area_wrapper.children.length;
button.addEventListener("click", () => {
  card_area.classList.toggle("card-area-onclick");


  let city =serach_city.value
  let apiUrl="https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=en&q="
  let apiKey="f6462ef3aa1b7e148ef9577a7c0d5b46"
  
   


if(serach_city.value!=="")
    {

        let  heading= document.createElement("h2");
        heading.innerText="PUNE"
        let ul = document.createElement("ul");
        ul.classList.toggle("temp-list")
        card_area_wrapper.append(heading,ul)
       console.log(card_area_wrapper)

        setTimeout(function() {
            card_area_wrapper.classList.toggle("card-wrapper-onclick");
        }, 500);


        fetch(apiUrl + city + `&appid=`+apiKey)
        .then(response => response.json())
        .then(data => 
            {
            for(let i=0 ,j=0;i<39 && j<5;i=i+8,j++)
                {   let city_name= data.city.name
                    let temp=data.list[i].main.temp
                    let icn=data.list[i].weather[0].main
                    let desc=data.list[i].weather[0].description
                    // console.log(data.list[i].main.temp)
                    // console.log(data.list[i].weather[0].main)
                    //  console.log(data.list[i].weather[0].description)
                    // console.log(data.list[i].dt_txt.splice(0,4))
                    console.log(data)

                    console.log(data.list[i])

                    let li = document.createElement("li");
                    li.setAttribute("id", j);
                    ul.appendChild(li);
                    let span1 = document.createElement("span");
                    span1.classList.toggle("city-name");
                    span1.innerText = city_name;
              
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
                    console.log(li.id)
                }
           }) 
        .catch(error => console.error('Error:', error));
      



    // for (let i = 1; i <= 5; i++) {
    //   let idName = i;
    //   let li = document.createElement("li");
    //   li.setAttribute("id", idName);
    //   ul.appendChild(li);
    //   let span1 = document.createElement("span");
    //   span1.classList.toggle("city-name");
    //   span1.innerText = "Paris";

    //   let divT = document.createElement("div");
    //   divT.classList.toggle("temprature");
    //   let div_span1 = document.createElement("span");
    //   div_span1.classList.toggle("temprature-span");
    //   div_span1.innerText = "25";
    //   let div_span2 = document.createElement("span");
    //   div_span2.classList.toggle("inside-temprature");
    //   div_span2.innerText = "°C";
    //   divT.append(div_span1, div_span2);

    //   let span2 = document.createElement("span");
    //   span2.classList.toggle("icon");
    //   span2.innerText = "icon";

    //   let span3 = document.createElement("span");
    //   span3.classList.toggle("discription");
    //   span3.innerText = "cloud";

    //   li.append(span1, divT, span2, span3);
    //   let list1=document.getElementById("#1")
    //   console.log(li.id)
    // }
 


}
   
    else {
        let error = document.createElement("div");
        error.classList.toggle("error-div")
        card_area_wrapper.appendChild(error);

        let oops = document.createElement("span");
        oops.innerText="oops!"
        oops.classList.toggle("oops")
        let msg = document.createElement("span");
        msg.innerText="invalid city name"
        error.append(oops,msg);
    
      }

});

// f6462ef3aa1b7e148ef9577a7c0d5b46
//https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=f6462ef3aa1b7e148ef9577a7c0d5b46


