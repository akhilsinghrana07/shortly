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

// function validURL(str) {
//   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
//     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
//     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
//     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
//     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
//     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
//   return !!pattern.test(str);
// }

function validURL(str) {
  let regEx =/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

  return regEx.test(str);
}

// var elm;
// function validURL(str){
//   if(!elm){
//     elm = document.createElement('input');
//     elm.setAttribute('type', 'url');
//   }
//   elm.value = str;
//   return elm.validity.valid;
// }



// EventListeners
inputSearch.addEventListener("input", updateInput);
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validURL(searchValue) && searchValue.includes("rebrand") === false) {
    shortenURL(searchValue);
    document.getElementById("invalid").style.display="none";
    document.getElementById("inp").style.border="2px solid blue";
    console.log(inputSearch.value);
  } else {
    document.getElementById("inp").style.border="2px solid red";
		document.getElementById("invalid").style.display="block";
		document.getElementById("invalid").innerHTML="Url is not valid";
  }
  clear();
});

ScrollReveal().reveal(".row");










// const $form = document.getElementById('form'),
// 	$inputURL = document.getElementById('input-url'),
// 	$shortenList = document.getElementById('shorten-list');

// let urlList = JSON.parse(localStorage.getItem('urls')) || [];

// const addToLS = (urlInfo) => {
// 	urlList.push(urlInfo);
// 	localStorage.setItem('urls', JSON.stringify(urlList));
// };
// const renderURLs = () => {
// 	urlList.forEach(({ url }) => {
// 		renderShortenURL(url);
// 	});
// };

// const renderShortenURL = (url) => {
// 	const result = document.createElement('div');
// 	result.className = 'shortener__result';
// 	result.innerHTML = `
//     <p class="normal-link text">
//       ${url}
//     </p>
//     <p class="shorten-link">${url}</p>
//     <button class="btn btn--copy">Copy</button>
//   `;
// 	$shortenList.appendChild(result);
// };

// const invalidInput = () => {
// 	const box = $inputURL.parentElement;
// 	box.classList.add('invalid');
// 	box.nextElementSibling.nextElementSibling.classList.add('show');
// };

// const validInput = () => {
// 	const box = $inputURL.parentElement;
// 	box.classList.remove('invalid');
// 	box.nextElementSibling.nextElementSibling.classList.remove('show');
// };

// const handleSubmit = (e) => {
// 	e.preventDefault();
// 	const url = $inputURL.value.trim();
// 	if (!url) {
// 		invalidInput();
// 		return;
// 	}
// 	validInput();
// 	$form.reset();
// 	renderShortenURL(url);
// 	addToLS({ url, shortenUrl: url });
// };

// const copyToClipboard = (text, btn) => {
// 	navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
// 		if (result.state == 'granted' || result.state == 'prompt') {
// 			navigator.clipboard
// 				.writeText(text)
// 				.then(() => {
// 					btn.classList.add('btn--violet');
// 					btn.innerText = 'Copied!';
// 					setTimeout(() => {
// 						btn.classList.remove('btn--violet');
// 						btn.innerText = 'Copy';
// 					}, 2000);
// 				})
// 				.catch(() => {
// 					alert('Unexpected error. Please try again');
// 				});
// 		}
// 	});
// };

// const handleCopy = ({ target }) => {
// 	if (target.classList.contains('btn--copy')) {
// 		text = target.previousElementSibling.innerText;
// 		copyToClipboard(text, target);
// 	}
// };

// const init = () => {
// 	if (urlList.length) {
// 		renderURLs();
// 	}
// };

// $form.addEventListener('submit', handleSubmit);
// $shortenList.addEventListener('click', handleCopy);

// init();
