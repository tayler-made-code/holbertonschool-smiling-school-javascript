const quoteSection = document.querySelector("#quote-carousel") // Target the quote section
const loader = document.querySelector("#loader"); // Target the loader
const popularVideos = document.querySelector("#popularVideos"); // Target the popular videos section
const latestVideos = document.querySelector("#latestVideos"); // Target the latest videos section

$(document).ready(function () { // When the pages loads, fetch the quotes
  // call fetchQuotes if the page is the index.html
  console.log(window.location.pathname);
  if (window.location.pathname == "/0-homepage.html") {
    loader.classList.remove("d-none");
    $("#videoSlider").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
    fetchQuotes();
    fetchVideos(popularVideos);
    // fetchVideos(latestVideos);
  }

  if (window.location.pathname == "/0-pricing.html") {
    loader.classList.remove("d-none");
    fetchQuotes();
  }

});

function fetchQuotes() {  // Fetch the quotes from the API
  // Add the loader
  fetch("https://smileschool-api.hbtn.info/quotes")
    .then((response) => response.json())
    .then((quotes) => {
      loader.classList.add("d-none"); // Remove the loader & text-center
      quoteSection.classList.remove("text-center");

      console.log(quotes); // For testing purposes
      // Loop through the quotes and add them to the page
      quotes.forEach((quote) => {
        // set the variables for the quote info
        let quotePic = quote.pic_url;
        let quoteName = quote.name;
        let quoteTitle = quote.title;
        let quoteText = quote.text;

        // create the carousel-item, the first one will be active
        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        if (quote.id == 1) {
          carouselItem.classList.add("active");
        }

        let carouselRow = document.createElement("div");
        carouselRow.classList.add("row", "mx-auto", "align-items-center");

        let carouselCol = document.createElement("div");
        carouselCol.classList.add("col-12", "col-sm-2", "col-lg-2", "offset-lg-1", "text-center");

        let carouselImg = document.createElement("img");
        carouselImg.classList.add("d-block", "align-self-center", "rounded-circle");
        carouselImg.setAttribute("src", quotePic);
        carouselImg.setAttribute("alt", `Carousel Pic ${quote.id}`);

        let carouselCol2 = document.createElement("div");
        carouselCol2.classList.add("col-12", "col-sm-7", "offset-sm-2", "col-lg-9", "offset-lg-0");

        let quotedText = document.createElement("div");
        quotedText.classList.add("quote-text");

        let quoteParagraph = document.createElement("p");
        quoteParagraph.classList.add("text-white");
        quoteParagraph.innerHTML = quoteText;

        let personName = document.createElement("h4");
        personName.classList.add("text-white", "font-weight-bold");
        personName.innerHTML = quoteName;

        let personTitle = document.createElement("span");
        personTitle.classList.add("text-white");
        personTitle.innerHTML = quoteTitle;

        // append the elements to the page and remove the loader
        quoteSection.appendChild(carouselItem);
        carouselItem.appendChild(carouselRow);
        carouselRow.appendChild(carouselCol);
        carouselCol.appendChild(carouselImg);
        carouselRow.appendChild(carouselCol2);
        carouselCol2.appendChild(quotedText);
        quotedText.appendChild(quoteParagraph);
        quotedText.appendChild(personName);
        quotedText.appendChild(personTitle);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function fetchVideos(section) {
  // Check to see which section is being called
  if (section === popularVideos) {
    fetch("https://smileschool-api.hbtn.info/popular-tutorials")
      .then((response) => response.json())
      .then((videos) => {
        console.log(videos); // For testing purposes

        // Loop through the videos and add them to the page
        videos.forEach((video) => {
          // set the variables for the video info
          let videoPreview = video.thumb_url;
          let videoTitle = video.title;
          // Use bracket notation for sub-title due to hyphen
          let subTitle = video['sub-title'];
          let authorPhoto = video.author_pic_url;
          let authorName = video.author;
          let ratingStars = video.star;
          let videoDuration = video.duration;

          // create carousel with slick slider
          
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  } else {
    console.log("not popular videos")
  }
}