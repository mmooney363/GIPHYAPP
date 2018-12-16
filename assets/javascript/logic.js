const topics = ["Nissan", "Ford", "Lamborghini", "Mercedes Benz", "BMW", "Toyota", "Bentley", "Mazda"];

function createBtn(item) {
  return `<button onclick="makeGifs(event);" class="btn1" data-name=${item}>${item}</button>&nbsp&nbsp`;
}

function renderBtns() {
  topics.forEach(
    function (item) {
      $("#origButtons").append(createBtn(item));
    }
  )
}

function handleApiRes(response) {
  $("#gifArea").html('')

  response.data.forEach(function (item) {
    const gifDiv = $("<div>");
    const p = $("<p>").text("Rating: " + item.rating);
    const carImage = $("<img>");

    carImage.attr("src", item.images.fixed_height.url);
    gifDiv.prepend(p);
    gifDiv.prepend(carImage);
    $("#gifArea").prepend(gifDiv);
  })
}

function makeGifs(event) {
  const car = event.target.getAttribute('data-name');
  const queryUrl = `https://api.giphy.com/v1/gifs/search?q=${car}&api_key=qPP6DrSoZK3pIKpDdWO3IOTGcjM3sWYn&limit=10`;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(handleApiRes)
}

$(document).ready(function () {
  renderBtns()

  $("#anything").on("click", function (event) {
    event.preventDefault();
    const newCar = $("#form-value").val().trim();
    $("#origButtons").append(createBtn(newCar));
  });
})

$(document).on("click", pausePlayGifs());

function pausePlayGifs() {
  var state = $(this).attr("data-state");
   if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still")}}