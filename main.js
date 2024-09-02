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

const apiKey = "8a835bf963f6402e9700cf296387075c";
// api link with the key
const healthUrl = `https://newsapi.org/v2/everything?q=health&language=en&apiKey=${apiKey}`;

// search input and search for news

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
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayNews(data.articles);
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
             <h3 class="py-3">${article.title}</h3>
            <p class="py-3 pb-5">${article.description}</p>
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

fetch(healthUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data.articles.length > 0) {
      const firstArticles = data.articles.slice(0, 3);
      const leftContainer = document.querySelector(".left-container");
      leftContainer.innerHTML = ""; // Clear any existing content

      firstArticles.forEach((article) => {
        leftContainer.innerHTML += `
        <div class="py-5">
        <p class="">${article.publishedAt}</p>
          <img class="w-full rounded-xl" src="${article.urlToImage}" alt="">
          <p class="font-bold text-right text-xl">${article.description}</p>
          <div class="flex items-center py-3 justify-between">
            <p>${article.author}</p>
            <p class="text-right">${article.publishedAt}</p>
          </div>
          <a href="${article.url}" target="_blank">
            <button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button>
          </a>
          </div>
        `;
      });

      const threeNewsCenter = data.articles.slice(3, 6); // Get the next three articles
      const centerNews = document.querySelector(".center-news");
      centerNews.innerHTML = ""; // Clear any existing content

      threeNewsCenter.forEach((article) => {
        centerNews.innerHTML += `
          <div class="py-5">
          
          <p>${article.publishedAt}</p>
          
          <img class="rounded-lg" src="${article.urlToImage}" alt="">
          <p class="text-xl font-semibold py-6 text-right">${article.description}</p>
          <a class="text-white rounded-lg bg-black py-2 px-4" href="${article.url}" target="_blank">اقرأ المزيد</a>
          </div>
            
        `;
      });
      const slidersContainer = document.querySelectorAll(".swiper-slide");
      const slidersNews = data.articles.slice(0, 4); // Adjust the range as needed
      // news slider
      slidersContainer.forEach((slide, index) => {
        const article = slidersNews[index];
        slide.innerHTML = `
        <div
          class="w-full h-full slider bg-cover bg-center"
          style="background-image: url('${article.urlToImage}')">
            <div class="px-4 flex flex-col justify-end items-start py-7 gap-4 w-full h-full">
            <p class="w-full text-base text-left px-2 rounded-sm md:text-3xl bg-gray-500/50 font-bold py-4">${article.description}</p>
            <a
              class="text-white rounded-lg bg-black py-4 px-6 text-base md:text-lg font-semibold"
              href="${article.url}"
              target="_blank"
              rel="noopener noreferrer"
              >اقرأ المزيد</a>
              </div>
    `;
      });
    }
  })
  .catch((error) => console.error("Error:", error));

const tecUrl = `https://newsapi.org/v2/everything?q=war&language=en&apiKey=${apiKey}`;

fetch(tecUrl)
  .then((response) => response.json())
  .then((data) => {
    const rightNews = document.querySelector(".right-news ");
    const threeNewsRight = data.articles.slice(4, 7);
    threeNewsRight.forEach((article) => {
      rightNews.innerHTML += `
      <div class="py-5">
      <div class="flex justify-between items-center pb-2 ">
          <p>${article.publishedAt}</p>
        </div>
        <img class="rounded-lg" src="${article.urlToImage}" alt="">
        <p class="text-xl font-semibold py-6 text-right">${article.description}</p>
        <a class="text-white rounded-lg bg-black py-2 px-4" href="${article.url}" target="_blank"> اقراء المزيد</a>
      
      </div>
       
      
      
      `;
    });
  });

//  same api for puplic news in ar

const topUrl = `https://newsapi.org/v2/everything?q=*&language=ar&apiKey=${apiKey}`;
let currentIndex = 4; // Start after the initial 4 articles for the right section
let leftCurrentIndex = 8; // Start after the initial 8 articles for the left section

fetch(topUrl)
  .then((response) => response.json())
  .then((data) => {
    const firstNew = data.articles.slice(6, 8);
    const leftSection = document.querySelector(".left-second-setion");
    firstNew.forEach((article) => {
      leftSection.innerHTML += `
        <div class="py-2"> 
          <img class="w-full h-[340px] rounded-xl" src="${article.urlToImage}" alt="">
          <p class="font-bold text-right text-xl">${article.description}</p>
          <div class="flex items-center py-3 justify-between">
          <p>${article.author}</p>
          <p class="text-right">${article.publishedAt}</p>
        </div>
        <a href="${article.url}" target="_blank" ><button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button></a>
        </div>
      `;
    });

    // Initial articles display for the right section
    const twoNews = data.articles.slice(2, 4);
    const rightSection = document.querySelector(".right-second");
    twoNews.forEach((article) => {
      rightSection.innerHTML += `
        <div class="py-4">
         <img class="w-full h-[40%] rounded-xl" src="${article.urlToImage}" alt="">
    <p class="font-bold text-right text-xl">${article.description}</p>
     <div class="flex items-center py-3 justify-between">
       <p>${article.author}</p>
      <p class="text-right">${article.publishedAt}</p>
     </div>
    <a href="${article.url}" target="_blank" ><button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button></a>
        </div>
        `;
    });
    const readMore = document.querySelector(".readMore");
    readMore.addEventListener("click", () => {
      const firstNew = data.articles.slice(currentIndex, currentIndex + 2);
      const leftSection = document.querySelector(".left-second-setion");
      firstNew.forEach((article) => {
        leftSection.innerHTML += `
          <div class="py-2"> 
            <img class="w-full h-[340px] rounded-xl" src="${article.urlToImage}" alt="">
            <p class="font-bold text-right text-xl">${article.description}</p>
            <div class="flex items-center py-3 justify-between">
            <p>${article.author}</p>
            <p class="text-right">${article.publishedAt}</p>
          </div>
          <a href="${article.url}" target="_blank" ><button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button></a>
          </div>
        `;
      });
      const twoNews = data.articles.slice(
        leftCurrentIndex,
        leftCurrentIndex + 2
      );
      const rightSection = document.querySelector(".right-second");
      twoNews.forEach((article) => {
        rightSection.innerHTML += `
        <div class="py-4">
         <img class="w-full h-[40%] rounded-xl" src="${article.urlToImage}" alt="">
    <p class="font-bold text-right text-xl">${article.description}</p>
     <div class="flex items-center py-3 justify-between">
       <p>${article.author}</p>
      <p class="text-right">${article.publishedAt}</p>
     </div>
    <a href="${article.url}" target="_blank" ><button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button></a>
        </div>
        `;
      });
      currentIndex += 2;
      leftCurrentIndex += 2;
    });
    const newOne = document.querySelector(".news-one");
    const newTwo = document.querySelector(".news-two");
    const newThree = document.querySelector(".news-three");
    const articleOne = data.articles[10];
    newOne.innerHTML = `
    <div class=" py-2 mt-5">
  <p class="text-end">${articleOne.publishedAt}</p>
</div>
<p class="text-xl font-semibold py-6 text-right">${articleOne.description}</p>
<a class="text-white rounded-lg bg-black py-2 px-4" href="${articleOne.url}" target="_blank"> اقراء المزيد</a>
    
    `;
    const articleTwo = data.articles[11];
    newTwo.innerHTML = `
      <div class=" py-2 mt-5">
  <p class="text-end">${articleTwo.publishedAt}</p>
</div>
<p class="text-xl font-semibold py-6 text-right">${articleTwo.description}</p>
<a class="text-white rounded-lg bg-black py-2 px-4" href="${articleTwo.url}" target="_blank"> اقراء المزيد</a>
    `;
    const articleThree = data.articles[12];
    newThree.innerHTML = `
    <div class=" py-2 mt-5">
  <p class="text-end">${articleThree.publishedAt}</p>
</div>
<p class="text-xl font-semibold py-6 text-right">${articleThree.description}</p>
<a class="text-white rounded-lg bg-black py-2 px-4" href="${articleThree.url}" target="_blank"> اقراء المزيد</a>
    
    `;
  })
  .catch((error) => console.error("api Error", error));

// youtube api key for videos

const youtubeKey = "AIzaSyA9RG0OpvLleCUQ2NzXYylk2cchdF6U-M8";
const query = "أخبار";
const maxResults = 6;
const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=${maxResults}&key=${youtubeKey}&relevanceLanguage=ar`;

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

const urlSport = `https://newsapi.org/v2/everything?q=sport&language=en&apiKey=${apiKey}`;

fetch(urlSport)
  .then((response) => response.json())
  .then((data) => {
    firstArticle = data.articles[0];
    const rightSportNew = document.querySelector(".leftSport");
    rightSportNew.innerHTML = `
    <div class="py-4">
         <img class="w-full h-[40%] rounded-xl" src="${firstArticle.urlToImage}" alt="">
    <p class="font-bold text-right text-xl">${firstArticle.description}</p>
     <div class="flex items-center py-3 justify-between">
       <p>${firstArticle.author}</p>
      <p class="text-right">${firstArticle.publishedAt}</p>
     </div>
    <a href="${firstArticle.url}" target="_blank" ><button class="text-white rounded-lg bg-black py-2 px-4">اقرأ المزيد</button></a>
        </div>
    
    `;
    const articles = data.articles.slice(0, 3);
    const threeSportNews = document.querySelector(".rightSport");
    articles.forEach((article) => {
      threeSportNews.innerHTML += `
      <div class=" py-2 mt-5">
  <p class="text-end">${article.publishedAt}</p>
</div>
<p class="text-xl font-semibold py-6 text-right">${article.description}</p>
<a class="text-white rounded-lg bg-black py-2 px-4" href="${article.url}" target="_blank"> اقراء المزيد</a>`;
    });

    const threeSport = document.querySelector(".sport-News");
    const articlesNews = data.articles.slice(3, 6);
    articlesNews.forEach((article) => {
      threeSport.innerHTML += `
      
<div>

  <p class="text-right px-4">${article.publishedAt}</p>

<p class="text-xl font-semibold px-4 py-6 text-left">${article.description}</p>
<a class="text-white rounded-lg ml-4 bg-black py-2 px-4" href="${article.url}" target="_blank"> Read More</a>
</div>


      `;
    });
  });
