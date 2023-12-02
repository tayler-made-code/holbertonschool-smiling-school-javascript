const quoteSection = document.querySelector("#quote-carousel")

// When the page loads fetch quotes from the API
window.addEventListener("load", () => {
    fetchQuotes()
})

function fetchQuotes() {
  // Wrap the div in a loading spinner while the quotes are being fetched


  // Fetch the quotes from the API
    fetch("https://smileschool-api.hbtn.info/quotes")
    .then((response) => response.json())
    .then((quotes) => {
      console.log(quotes);
      // Loop through the quotes and add them to the page
      quotes.forEach((quote) => {
        // set the variables for the quote info
        let pic = quote.pic_url;
        let name = quote.name;
        let title = quote.title;
        let text = quote.text;

        // create the carousel-item, the first one will be active
        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        if (quote.id == 1) {
          carouselItem.classList.add("active");
        }
        quoteSection.appendChild(carouselItem);

        let carouselRow = document.createElement("div");
        carouselRow.classList.add("row", "mx-auto", "align-items-center");
        carouselItem.appendChild(carouselRow);

        let carouselCol = document.createElement("div");
        carouselCol.classList.add("col-12", "col-sm-2", "col-lg-2", "offset-lg-1", "text-center");

        let carouselImg = document.createElement("img");
        carouselImg.classList.add("d-block", "align-self-center");
        carouselImg.setAttribute("src", pic);
        carouselImg.setAttribute("alt", `Carousel Pic ${quote.id}`);
        let carouselCol2 = document.createElement("div");
        carouselCol2.classList.add("col-12", "col-sm-7", "offset-sm-2", "col-lg-9", "offset-lg-0");
        let quoteText = document.createElement("div");
        quoteText.classList.add("quote-text");
        let quoteParagraph = document.createElement("p");
        quoteParagraph.classList.add("text-white");
        quoteParagraph.innerHTML = text;
        let personName = document.createElement("h4");
        personName.classList.add("text-white", "font-weight-bold");
        personName.innerHTML = name;
        let personTitle = document.createElement("span");
        personTitle.classList.add("text-white");
        personTitle.innerHTML = title;

        // append the elements to the page and turn the spinner to false
        carouselItem.appendChild(carouselRow);
        carouselRow.appendChild(carouselCol);
        carouselCol.appendChild(carouselImg);
        carouselRow.appendChild(carouselCol2);
        carouselCol2.appendChild(quoteText);
        quoteText.appendChild(quoteParagraph);
        quoteText.appendChild(personName);
        quoteText.appendChild(personTitle);

      });
    })
    .catch((error) => {
      console.log("error", error);
    });
}
