// Targets and Loaders

const quoteSection = document.querySelector("#quote-carousel") // Target the quote section
const quoteLoader = document.querySelector("#quoteLoader"); // Target the loader

const popularVideos = document.querySelector("#popVideos"); // Target the popular videos section
const popLoader = document.querySelector("#popLoader"); // Target the loader

const latestVideos = document.querySelector("#latestVideos"); // Target the latest videos section
const latestLoader = document.querySelector("#latestLoader"); // Target the loader

const coursesSection = document.querySelector("#coursesContainer"); // Target the courses section
const courseLoader = document.querySelector("#courseLoader"); // Target the loader

const searchButton = document.querySelector("#searchButton"); // Target the search button

const topicDropdown = document.querySelector("#topicDropdown"); // Target the topic dropdown
const topicTitle = document.querySelector("#topicTitle"); // Target the topic title

const sortDropdown = document.querySelector("#sortDropdown"); // Target the sort dropdown
const sortTitle = document.querySelector("#sortTitle"); // Target the sort title

$(document).ready(function () { // When the pages loads, fetch the quotes
  // call fetchQuotes and fetchVideos if the page is the homepage
  console.log(window.location.pathname);
  if (window.location.pathname == "/0-homepage.html" || window.location.pathname == "/1-homepage.html" || window.location.pathname == "/2-homepage.html" || window.location.pathname == "/homepage.html") {
    quoteLoader.classList.remove("d-none");
    fetchQuotes();
    popLoader.classList.remove("d-none");
    fetchVideos(popularVideos)
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

  // call fetchQuotes if the page is the pricing page
  if (window.location.pathname == "/0-pricing.html" || window.location.pathname == "/pricing.html") {
    quoteLoader.classList.remove("d-none");
    fetchQuotes();
  }

  // call fetchCourses if the page is the courses page
  if (window.location.pathname == "/0-courses.html" || window.location.pathname == "/courses.html") {
    courseLoader.classList.remove("d-none");
    setTopicsAndSort();
    fetchCourses();
  }
});

function fetchQuotes() {  // Fetch the quotes from the API
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
  playButton.style.transform = "translate(-50%, -75%)";

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

function fetchCourses(q, topic, sort) {
  // set the url and check if there is a keyword
  let url = q ? 
  `https://smileschool-api.hbtn.info/courses?q=${q}&topic=${topic}&sort=${sort}` : 
  `https://smileschool-api.hbtn.info/courses/?topic=${topic}&sort=${sort}`;

  console.log(url); // For testing purposes

  fetch(url)
    .then((response) => response.json())
    .then((results) => {
      // Remove the loader
      courseLoader.classList.add("d-none");
      
      console.log(results); // For testing purposes

      // console.log how many courses there are
      console.log(results.courses.length);

      // save the courses in a variable
      let courses = results.courses;

      // create a div with section-title, in that div create a span
      // with the number of courses
      let sectionTitle = document.createElement("div");
      sectionTitle.classList.add("section-title");

      let courseCount = document.createElement("span");
      courseCount.classList.add("text-muted", "video-count");
      courseCount.innerHTML = `${courses.length} videos`;

      // append the elements to the page
      coursesSection.appendChild(sectionTitle);
      sectionTitle.appendChild(courseCount);

      // create a row for all of the courses
      let courseRow = document.createElement("div");
      courseRow.classList.add("row");

      // append the row to the page
      coursesSection.appendChild(courseRow);

      // create a card for each course
      courses.forEach((course) => {
        let courseSizing = document.createElement("div");
        courseSizing.classList.add("col-12", "col-sm-4", "col-lg-3", "d-flex", "justify-content-center");

        let courseCard = createVideoCard(course);
        courseCard.classList.remove("px-3");

        courseRow.appendChild(courseSizing);
        courseSizing.appendChild(courseCard);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
} 

function setTopicsAndSort() {
  fetch('https://smileschool-api.hbtn.info/courses')
    .then((response) => response.json())
    .then((results) => {
      // customize dropdown menu options for Topic
      const topics = results.topics;
      
      topics.forEach((topic) => {
        let topicOption = document.createElement("a");
        topicOption.classList.add("dropdown-item", "text-capitalize");
        topicOption.setAttribute("href", "#");
        topicOption.innerHTML = topic;
        document.querySelector("#topicDropdown").appendChild(topicOption);
      });

      // customize dropdown menu options for Sort By
      const sorts = results.sorts;

      sorts.forEach((sort) => {
        let sortOption = document.createElement("a");
        sortOption.classList.add("dropdown-item");
        sortOption.setAttribute("href", "#");
        //remove the underscore and capitalize the first letter of each word
        sort = sort.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        sortOption.innerHTML = sort;
        document.querySelector("#sortDropdown").appendChild(sortOption);
      });
    })
    .catch((error) => {
      console.log("error", error);
    }); 
}

// Search Event Listeners
document.querySelector("#searchBar").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    advancedSearch(searchBar.value, topicTitle.innerHTML, sortTitle.innerHTML);
  }
});
document.querySelector("#searchButton").addEventListener("click", () => {
  advancedSearch(searchBar.value, topicTitle.innerHTML, sortTitle.innerHTML);
});

// when a dropdown item is clicked, change the dropdown button text
// and then call advancedSearch
document.querySelector("#topicDropdown").addEventListener("click", () => {
  new Promise ((resolve) => {
    let topic = event.target.innerHTML;
    topic = topic.replace(/\b\w/g, l => l.toUpperCase());
    topicTitle.innerHTML = topic;
    resolve();
  })
  .then(() => {
    advancedSearch(searchBar.value, topicTitle.innerHTML, sortTitle.innerHTML);
  })
  .catch((error) => {
    console.log("error", error);
  });
});

// when a dropdown item is clicked, change the dropdown button text
// and then call advancedSearch
document.querySelector("#sortDropdown").addEventListener("click", () => {
  new Promise ((resolve) => {
    let topic = event.target.innerHTML;
    topic = topic.replace(/\b\w/g, l => l.toUpperCase());
    sortTitle.innerHTML = topic;
    resolve();
  })
  .then(() => {
    advancedSearch(searchBar.value, topicTitle.innerHTML, sortTitle.innerHTML);
  })
  .catch((error) => {
    console.log("error", error);
  });
});



function advancedSearch(q, topic, sort) {
  // clear the courses section and add the loader
  coursesSection.innerHTML = '';
  courseLoader.classList.remove("d-none");

  // let advancedSearchTopic = topicTitle.innerHTML;
  // advancedSearchTopic = advancedSearchTopic.slice(1).toLowerCase();
  let advancedSearchTopic = topic.toLowerCase();
  let advancedSearchSort = sort.replace(/ /g, "_").toLowerCase();

  // fetch the filtered courses
  fetchCourses(searchBar.value, advancedSearchTopic, advancedSearchSort);
}