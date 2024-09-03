// time and date dynamic for the  navbar
function timeAndDate() {
  const date = document.querySelector(".date");
  const time = document.querySelector(".time");
  const now = new Date();

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const formattedDate = now.toLocaleString("ar", dateOptions);
  const formattedTime = now.toLocaleString("ar", timeOptions);
  time.textContent = formattedTime;
  date.textContent = formattedDate;
}

timeAndDate();
setInterval(timeAndDate, 1000);
const searchUrl =
  "https://newsdata.io/api/1/news?apikey=pub_52520c79fff47c5d7f9f9b33be9836c7191d3&language=ar";

// Search input and search for news
const searchInput = document.querySelector(".searchInput");
const searchButton = document.querySelector(".searchButton");
const newsContainer = document.querySelector(".newsContainer");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    newsContainer.classList.remove("hidden");
    newsSearch.classList.remove("hidden");
    fetchNews(query);
  }
});

function fetchNews(query) {
  const url = `${searchUrl}&q=${encodeURIComponent(query)}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayNews(data.results);
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  if (articles.length === 0) {
    newsContainer.innerHTML = `<p>No news found for your search.</p>`;
  }
  articles.forEach((article) => {
    newsContainer.innerHTML += `
            <div class="px-3 py-1 pb-3 mt-2 border-2">
             <h3 class="py-6">${article.title}</h3>
            <a class="text-white rounded-lg bg-black py-2 px-4" href="${article.url}" target="_blank"> Read More</a>
            </div>
    `;
  });
}

const newsSearch = document.querySelector(".newsSearch");
const closeIcon = document.querySelector(".close");
closeIcon.addEventListener("click", () => {
  newsSearch.classList.add("hidden");
});

// swiper link for slider images

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

const url = `https://newsdata.io/api/1/news?apikey=pub_525193b097bebaf0ed601974eb2f25e78652a&language=ar`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (data && data.results && data.results.length > 0) {
      // Display the first three articles
      const firstArticles = data.results.slice(0, 3);
      const leftContainer = document.querySelector(".left-container");
      leftContainer.innerHTML = ""; // Clear any existing content

      firstArticles.forEach((article) => {
        const imgTag = article.image_url
          ? `<img class="w-full rounded-xl" src="${article.image_url}" alt="">`
          : "";

        leftContainer.innerHTML += `
          <div class="py-5">
            <p class="">${article.pubDate}</p>
            ${imgTag}
            <p class="font-bold text-right text-xl">${article.description}</p>
            <p class="text-right">${article.language}</p>
            <a href="${article.link}" target="_blank">
              <button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button>
            </a>
          </div>
        `;
      });

      // Display the next three articles
      const threeNewsCenter = data.results.slice(3, 6);
      const centerNews = document.querySelector(".center-news");
      centerNews.innerHTML = ""; // Clear any existing content

      threeNewsCenter.forEach((article) => {
        const imgTag = article.image_url
          ? `<img class="w-full rounded-xl" src="${article.image_url}" alt="News Photo">`
          : "";

        centerNews.innerHTML += `
          <div class="py-5">
            <p class="">${article.pubDate}</p>
            ${imgTag}
            <p class="font-bold text-right text-xl">${article.description}</p>
            <p class="text-right">${article.language}</p>
            <a href="${article.link}" target="_blank">
              <button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button>
            </a>
          </div>
        `;
      });

      // Display news sliders
      const slidersContainer = document.querySelectorAll(".swiper-slide");
      const slidersNews = data.results.slice(6, 9); // Adjust the range as needed

      if (slidersNews.length < slidersContainer.length) {
      } else {
        slidersContainer.forEach((slide, index) => {
          const article = slidersNews[index];
          const bgImage = article.image_url
            ? `background-image: url('${article.image_url}')`
            : `background-image: url('${defaultImage}')`;

          slide.innerHTML = `
            <div class="w-full h-full slider bg-cover bg-center" style="${bgImage}">
              <div class="px-4 flex flex-col justify-end items-start py-7 gap-4 w-full h-full">
                <p class="w-full text-base text-right px-2 rounded-sm md:text-3xl bg-gray-500/50 font-bold py-4">${article.title}</p>
                <a class="text-white rounded-lg bg-black py-4 px-6 text-base md:text-lg font-semibold" href="${article.link}" target="_blank" rel="noopener noreferrer">اقرأ المزيد</a>
              </div>
            </div>
          `;
        });
      }

      // Display the next three articles on the right
      const rightNews = document.querySelector(".right-news");
      const threeNewsRight = data.results.slice(7, 11);

      threeNewsRight.forEach((article) => {
        const imgTag = article.image_url
          ? `<img class="w-full rounded-xl" src="${article.image_url}" alt="">`
          : "";

        rightNews.innerHTML += `
          <div class="py-5 ">
            <p class="">${article.pubDate}</p>
            ${imgTag}
            <p class="font-bold text-right text-xl">${article.description}</p>
            <p class="text-right">${article.language}</p>
            <a href="${article.link}" target="_blank">
              <button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button>
            </a>
          </div>
        `;
      });
    } else {
      console.error("No results found or data format incorrect.");
    }
  })
  .catch((error) => console.error("Error:", error));

//  same api for puplic news in ar

const topUrl = `https://newsdata.io/api/1/news?apikey=pub_525193b097bebaf0ed601974eb2f25e78652a&language=ar`;
let currentIndex = 4; // Start after the initial 4 articles for the right section
let leftCurrentIndex = 8; // Start after the initial 8 articles for the left section

fetch(topUrl)
  .then((response) => response.json())
  .then((data) => {
    if (!data.results || data.results.length === 0) {
      console.error("No results found or data format incorrect.");
      return;
    }

    // Initial display for the left section
    const firstNew = data.results.slice(5, 8);
    const leftSection = document.querySelector(".left-second-setion");
    firstNew.forEach((article) => {
      const imgTag = article.image_url
        ? `<img class="w-full rounded-xl" src="${article.image_url}" alt="">`
        : "";
      leftSection.innerHTML += `
        <div class="py-5 ">
            <p class="">${article.pubDate}</p>
            ${imgTag}
            <p class="font-bold text-right text-xl">${article.description}</p>
            <p class="text-right">${article.language}</p>
            <a href="${article.link}" target="_blank">
              <button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button>
            </a>
          </div>
      `;
    });

    // Initial articles display for the right section
    const twoNews = data.results.slice(1, 4);
    const rightSection = document.querySelector(".right-second");
    twoNews.forEach((article) => {
      const imgTag = article.image_url
        ? `<img class="w-full rounded-xl" src="${article.image_url}" alt="">`
        : "";
      rightSection.innerHTML += `
        <div class="py-5 ">
            <p class="">${article.pubDate}</p>
            ${imgTag}
            <p class="font-bold text-right text-xl">${article.description}</p>
            <p class="text-right">${article.language}</p>
            <a href="${article.link}" target="_blank">
              <button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button>
            </a>
          </div>
      `;
    });

    // Read More button functionality
    const readMore = document.querySelector(".readMore");
    readMore.addEventListener("click", () => {
      if (currentIndex >= data.results.length) {
        console.log("No more articles to load.");
        return;
      }

      const firstNew = data.results.slice(currentIndex, currentIndex + 2);
      const leftSection = document.querySelector(".left-second-setion");
      firstNew.forEach((article) => {
        const imgTag = article.image_url
          ? `<img class="w-full h-[340px] rounded-xl" src="${article.image_url}" alt="">`
          : "";
        leftSection.innerHTML += `
          <div class="py-2"> 
            ${imgTag}
            <p class="font-bold text-right text-xl">${article.description}</p>
            <div class="flex items-center py-3 justify-between">
              <p>${article.language}</p>
              <p class="text-right">${article.pubDate}</p>
            </div>
            <a href="${article.link}" target="_blank">
              <button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button>
            </a>
          </div>
        `;
      });

      const twoNews = data.results.slice(
        leftCurrentIndex,
        leftCurrentIndex + 2
      );
      const rightSection = document.querySelector(".right-second");
      twoNews.forEach((article) => {
        const imgTag = article.image_url
          ? `<img class="w-full h-[340px] rounded-xl" src="${article.image_url}" alt="">`
          : "";
        rightSection.innerHTML += `
          <div class="py-2"> 
            ${imgTag}
            <p class="font-bold text-right text-xl">${article.description}</p>
            <div class="flex items-center py-3 justify-between">
              <p>${article.language}</p>
              <p class="text-right">${article.pubDate}</p>
            </div>
            <a href="${article.link}" target="_blank">
              <button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button>
            </a>
          </div>
        `;
      });

      currentIndex += 2;
      leftCurrentIndex += 2;
    });

    // Display specific articles
    const newOne = document.querySelector(".news-one");
    const newTwo = document.querySelector(".news-two");
    const newThree = document.querySelector(".news-three");

    if (data.results.length > 1) {
      const articleOne = data.results[1];

      newOne.innerHTML = `
        <div class="py-2 mt-5">
          <p class="text-end">${articleOne.pubDate}</p>
        </div>
        <p class="text-xl font-semibold py-6 text-right">${articleOne.description}</p>
        <a class="text-white rounded-lg bg-black py-2 px-4" href="${articleOne.link}" target="_blank"> اقرأ المزيد</a>
      `;
    } else console.log("not found article");

    if (data.results.length > 2) {
      const articleTwo = data.results[2];
      newTwo.innerHTML = `
        <div class="py-2 mt-5">
          <p class="text-end">${articleTwo.pubDate}</p>
        </div>
        <p class="text-xl font-semibold py-6 text-right">${articleTwo.description}</p>
        <a class="text-white rounded-lg bg-black py-2 px-4" href="${articleTwo.link}" target="_blank"> اقرأ المزيد</a>
      `;
    }

    if (data.results.length > 3) {
      const articleThree = data.results[3];
      newThree.innerHTML = `
        <div class="py-2 mt-5">
          <p class="text-end">${articleThree.pubDate}</p>
        </div>
        <p class="text-xl font-semibold py-6 text-right">${articleThree.description}</p>
        <a class="text-white rounded-lg bg-black py-2 px-4" href="${articleThree.link}" target="_blank"> اقرأ المزيد</a>
      `;
    }
  })
  .catch((error) => console.error("API Error:", error));

// youtube api key for videos

const youtubeKey = "AIzaSyCdkgH8l-fV4Qd33MW4jln4t3P8JWDM6ro";
const queryy = "أخبار";
const maxResults = 6;
const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${queryy}&maxResults=${maxResults}&key=${youtubeKey}&relevanceLanguage=ar`;

// video news form youtube
fetch(youtubeUrl)
  .then((response) => response.json())
  .then((data) => {
    renderVideos(data.items);
  })
  .catch((error) => console.error("Error:Api Not Working", error));
function renderVideos(videos) {
  const videosContainer = document.querySelector(".videos");
  const heroVideo = document.querySelector(".heroVideo");

  // Clear previous content
  videosContainer.innerHTML = "";
  heroVideo.innerHTML = "";
  // Display the hero video
  const firstVideo = videos[0];
  const heroVideoId = firstVideo.id.videoId;
  const heroTitle = firstVideo.snippet.title;
  heroVideo.innerHTML = `
        <div class="relative pb-5 w-full h-full">
          <iframe
            class="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/${heroVideoId}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <p class="text-xl">${heroTitle}</p>
        </div>
      `;

  // Display the remaining videos
  videos.slice(1, 4).forEach((video) => {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const videoHtml = `
          <div class="relative pb-5 w-full">
            <iframe
              class="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/${videoId}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <p class="text-xl">${title}</p>
          </div>
        `;
    videosContainer.innerHTML += videoHtml;
  });
}

const watchMoreBtn = document.querySelector(".watchMore");

watchMoreBtn.addEventListener("click", () => {
  const query = "أخبار";
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
  window.open(youtubeSearchUrl, "_blank");
});

const urlSport = `https://newsdata.io/api/1/news?apikey=pub_525193b097bebaf0ed601974eb2f25e78652a&language=ar&category=sports
`;

fetch(urlSport)
  .then((response) => response.json())
  .then((data) => {
    firstArticle = data.results[0];
    const rightSportNew = document.querySelector(".leftSport");
    const imgTag = firstArticle.image_url
      ? ` <img class="w-full h-[40%] rounded-xl" src="${firstArticle.image_url}" alt="">`
      : ``;
    rightSportNew.innerHTML = `
    <div class="py-4">
        ${imgTag}
    <p class="font-bold text-right text-xl">${firstArticle.description}</p>
     <div class="flex items-center py-3 justify-between">
       <p>${firstArticle.pubDate}</p>
      <p class="text-right">${firstArticle.language}</p>
     </div>
    <a href="${firstArticle.link}" target="_blank" ><button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button></a>
        </div>
    
    `;
    const articles = data.results.slice(1, 4);
    const threeSportNews = document.querySelector(".rightSport");
    articles.forEach((article) => {
      threeSportNews.innerHTML += `
      <div class=" py-2 mt-5">
  <p class="text-end">${article.pubDate}</p>
</div>
<p class="text-xl font-semibold py-6 text-right">${article.description}</p>
<a class="text-white rounded-lg bg-black py-2 px-4" href="${article.link}" target="_blank"> اقراء المزيد</a>`;
    });

    const threeSport = document.querySelector(".sport-News");
    const articlesNews = data.results.slice(4, 7);
    articlesNews.forEach((article) => {
      threeSport.innerHTML += `
      
<div>

  <p class="text-right px-4">${article.pubDate}</p>

<p class="text-xl font-semibold px-4 py-6 text-left">${article.description}</p>
<a class="text-white rounded-lg ml-4 bg-black py-2 px-4" href="${article.link}" target="_blank"> Read More</a>
</div>


      `;
    });
  });
