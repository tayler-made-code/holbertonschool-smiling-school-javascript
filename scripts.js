const quoteSection = document.querySelector("#quote-carousel") // Target the quote section
const quoteLoader = document.querySelector("#quoteLoader"); // Target the loader
const popLoader = document.querySelector("#popLoader"); // Target the loader
const latestLoader = document.querySelector("#latestLoader"); // Target the loader
const popularVideos = document.querySelector("#popVideos"); // Target the popular videos section
const latestVideos = document.querySelector("#latestVideos"); // Target the latest videos section

$(document).ready(function () { // When the pages loads, fetch the quotes
  // call fetchQuotes if the page is the index.html
  console.log(window.location.pathname);
  if (window.location.pathname == "/0-homepage.html") {
    quoteLoader.classList.remove("d-none");
    fetchQuotes();
    popLoader.classList.remove("d-none");
    fetchVideos(popularVideos)
      // then fetchVideos for the latest videos
      .then(() => {
        $("#popVideos").slick({
          arrows: true,
          mobileFirst: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          infinite: true,
          responsive: [
            {
              breakpoint: 577,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 4,
              }
            }
          ]
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
      latestLoader.classList.remove("d-none");
      fetchVideos(latestVideos)
      // then fetchVideos for the latest videos
      .then(() => {
        $("#latestVideos").slick({
          arrows: true,
          mobileFirst: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          infinite: true,
          responsive: [
            {
              breakpoint: 577,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 4,
              }
            }
          ]
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  if (window.location.pathname == "/0-pricing.html") {
    quoteLoader.classList.remove("d-none");
    fetchQuotes();
  }

});

function fetchQuotes() {  // Fetch the quotes from the API
  // Add the loader
  fetch("https://smileschool-api.hbtn.info/quotes")
    .then((response) => response.json())
    .then((quotes) => {
      quoteLoader.classList.add("d-none"); // Remove the loader & text-center
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
  return new Promise((resolve, reject) => {
    // Check to see which section is being called
    let url = section === popularVideos ? "https://smileschool-api.hbtn.info/popular-tutorials" : "https://smileschool-api.hbtn.info/latest-videos";

    fetch(url)
      .then((response) => response.json())
      .then((videos) => {
        console.log(videos); // For testing purposes
        // Remove the loader
        if (section === popularVideos) {
          popLoader.classList.add("d-none");
          // popLoader.classList.remove("text-center");
        } else {
          latestLoader.classList.add("d-none");
          // latestLoader.classList.remove("text-center");
        }

        // if number of videos is 4 or less, perform the following twice
        if (videos.length <= 4) {
          let videosLength = videos.length;
          for (let i = 0; i < (videosLength * 2) - videosLength; i++) {
            videos.push(videos[i]);
          }
        }

        // Loop through the videos and add them to the page
        videos.forEach((video) => {
          let videoCard = createVideoCard(video);
          section.appendChild(videoCard);
        });

        resolve();
      })
      .catch((error) => {
        console.log("error", error);
        reject();
      });
  });
}

function createVideoCard(video) {
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
  let videoCard = document.createElement("div");
  videoCard.classList.add("card", "px-3");
  
  let videoImg = document.createElement("img");
  videoImg.classList.add("card-img-top");
  videoImg.setAttribute("src", videoPreview);
  videoImg.setAttribute("alt", `Video thumbnail`);          

  let videoOverlay = document.createElement("div");
  videoOverlay.style.position = "relative";

  let playButton = document.createElement("img");
  playButton.classList.add("play-overlay");
  playButton.setAttribute("src", "images/play.png");
  playButton.setAttribute("width", "25%%");
  playButton.style.position = "absolute";
  playButton.style.bottom = "50%";
  playButton.style.left = "50%";
  playButton.style.transform = "translate(-50%, -50%)";

  let videoCardBody = document.createElement("div");
  videoCardBody.classList.add("card-body");

  let h5VideoTitle = document.createElement("h5");
  h5VideoTitle.classList.add("card-title", "font-weight-bold");
  h5VideoTitle.innerHTML = videoTitle;

  let paragraphSubTitle = document.createElement("p");
  paragraphSubTitle.classList.add("card-text", "text-muted");
  paragraphSubTitle.innerHTML = subTitle;

  let videoInfo = document.createElement("div");
  videoInfo.classList.add("creator", "d-flex", "align-items-center");

  let authorImg = document.createElement("img");
  authorImg.classList.add("rounded-circle");
  authorImg.setAttribute("src", authorPhoto);
  authorImg.setAttribute("alt", "Creator of Video");
  authorImg.setAttribute("width", "30px");

  let h6AuthorName = document.createElement("h6");
  h6AuthorName.classList.add("pl-3", "m-0", "main-color");
  h6AuthorName.innerHTML = authorName;

  let ratingsAndDuration = document.createElement("div");
  ratingsAndDuration.classList.add("d-flex", "align-items-center", "pt-3", "info", "justify-content-between");

  let rating = document.createElement("div");
  rating.classList.add("d-inline-flex", "rating");

  // for each ratingStar, create a star with the on class, if the ratingStar
  // is less than 5, create a star with the off class until 5
  for (let i = 0; i < 5; i++) {
    let star = document.createElement("img");
    if (i < ratingStars) {
      star.classList.add("on");
      star.setAttribute("src", "images/star_on.png")
      star.setAttribute("alt", "star on");
    } else {
      star.classList.add("off");
      star.setAttribute("src", "images/star_off.png")
      star.setAttribute("alt", "star off");
    }
    star.setAttribute("width", "15px");
    rating.appendChild(star);
  }

  let duration = document.createElement("span");
  duration.classList.add("main-color");
  duration.innerHTML = videoDuration;
  
  // append the elements to the page
  videoCard.appendChild(videoImg);
  videoCard.appendChild(videoOverlay);
  videoOverlay.appendChild(playButton);
  videoCard.appendChild(videoCardBody);
  videoCardBody.appendChild(h5VideoTitle);
  videoCardBody.appendChild(paragraphSubTitle);
  videoCardBody.appendChild(videoInfo);
  videoInfo.appendChild(authorImg);
  videoInfo.appendChild(h6AuthorName);
  videoCardBody.appendChild(ratingsAndDuration);
  ratingsAndDuration.appendChild(rating);
  ratingsAndDuration.appendChild(duration);

  return videoCard;
}