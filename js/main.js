/* Variables */
let controller;
let slideScene;
const apiKey = "5fa28a5e63f74826994a50cbc9856419";
const inputSearch = document.querySelector(".input-search");
const submitButton = document.querySelector(".submit-button");
const searchResult = document.querySelector(".item");
const modal = document.querySelector(".cover");
const close = document.querySelector(".close");
let searchValue;

/* Functions */
function animateSlide() {
  controller = new ScrollMagic.Controller();
  // Add the animation to scroll
  const sliders = document.querySelectorAll(".slide");
  sliders.forEach((slide) => {
    // Create timeline and add animation to each selector
    const nav = document.querySelector(".navigation");
    const bannerText = document.querySelector(".desc");
    const bannerImg = document.querySelector(".banner-img");
    const searchContainer = document.querySelector(".search");
    const advancedStat = document.querySelector(".title");
    const cards = document.querySelectorAll(".card");
    const boostLink = document.querySelector(".boost-link");
    const ad = document.querySelector(".ad");
    const footer = document.querySelectorAll(".foot");
    const slideTl = gsap.timeline({
      defaults: { duration: 3, ease: "power3.inOut" },
    });
    slideTl.fromTo(nav, { y: "-200%" }, { y: 0, ease: "elastic.out" });
    slideTl.fromTo(
      bannerText,
      { x: "-150%" },
      { x: 0, ease: "bounce.out" },
      "-=2"
    );
    slideTl.fromTo(
      bannerImg,
      { x: "150%" },
      { x: 0, ease: "bounce.out" },
      "-=2"
    );
    slideTl.fromTo(
      searchContainer,
      { opacity: 0, scale: ".2" },
      { opacity: "1", scale: "1" },
      "-=2"
    );
    slideTl.fromTo(
      advancedStat,
      { rotate: "360", opacity: 0 },
      { rotate: "0", opacity: "1", duration: "2" },
      "-=1"
    );
    slideTl.fromTo(
      cards,
      {
        x: "400%",
      },
      {
        x: "0",
        duration: 1,
        stagger: ".25",
        ease: "back.out",
      }
    );
    slideTl.fromTo(
      ad,
      { opacity: 0, scale: "1.5" },
      { opacity: "1", scale: "1", duration: "2" },
      "-=.5"
    );
    slideTl.fromTo(footer, { y: "200%" }, { y: "0", stagger: ".25" }, "-=1");
    // Add animation on scroll
    // slideScene = new ScrollMagic.Scene({
    //   triggerElement: slide,
    //   triggerHook: "0.75",
    //   reverse: false,
    // })
    //   .setTween(slideTl)
    //   .addIndicators({
    //     colorStart: "blue",
    //     colorTrigger: "red",
    //     name: "slide",
    //   })
    //   .addTo(controller);
  });
}

function updateInput(e) {
  searchValue = e.target.value;
}

function clear() {
  inputSearch.value = "";
}

const createResultContainer = (result) => {
  const row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("rounded");
  row.classList.add("output");
  // 1. Input column
  const input = document.createElement("div");
  input.classList.add("col-12");
  input.classList.add("col-lg-6");
  input.innerText = result.destination;
  // 2. Result column
  const shortenURL = document.createElement("div");
  shortenURL.classList.add("col-12");
  shortenURL.classList.add("col-lg-4");
  shortenURL.classList.add("shorten-url");
  shortenURL.innerText = result.shortUrl;
  // 3. Copy button
  const copyButton = document.createElement("button");
  copyButton.setAttribute("type", "button");
  copyButton.setAttribute("data-toggle", "modal");
  copyButton.setAttribute("data-target", ".bd-example-modal-sm");
  copyButton.classList.add("btn");
  copyButton.classList.add("copy-btn");
  copyButton.classList.add("col-8");
  copyButton.classList.add("col-lg-1");
  copyButton.innerText = "Copy";
  // Append all
  row.appendChild(input);
  row.appendChild(shortenURL);
  row.appendChild(copyButton);
  searchResult.appendChild(row);
  // EventListener for copy to clipboard
  copyButton.addEventListener("click", () => {
    const textArea = document.createElement("textArea");
    textArea.value = shortenURL.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  });
};

const shortenURL = async (search) => {
  try {
    const dataFetch = await fetch("https://api.rebrandly.com/v1/links", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify({ destination: search }),
    });
    const response = await dataFetch.json();
    createResultContainer(response);
  } catch (error) {
    console.log(error.message);
  }
};

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

// EventListeners
inputSearch.addEventListener("input", updateInput);
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validURL(searchValue) && searchValue.includes("rebrand") === false) {
    shortenURL(searchValue);
    console.log(inputSearch.value);
  } else {
    alert("Wrong input try again");
  }
  clear();
});

ScrollReveal().reveal(".row");

//animateSlide();
