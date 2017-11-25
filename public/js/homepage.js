// the base time for all the setTimeout functions
let timeoutBase = 500;

function updateScroll(){
  const intro = document.getElementById("intro");
  intro.scrollTop = intro.scrollHeight;
}

// hide the footer and the links div in the beginning (for homepage only)
document.getElementById("footer").classList.add("hide");
document.getElementById("links").classList.add("hide");

// apply animations to the homepage headline
const headline = document.getElementById("main-heading");
setTimeout(() => {
  headline.classList.remove("hide");
  headline.classList.add("fadeInDown", "animated", "glitch");
  updateScroll();
}, timeoutBase + 1100);

// XHR Prmoise function to GET json data
const getJSON = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = () => {
      let status = xhr.status;
      status == 200 ? resolve(xhr.response) : reject({
        status: xhr.statusText
      });
    };
    xhr.onerror = () => {
      reject({
        status: xhr.statusText
      });
    };
    xhr.send();
  });
};

// generic function to apply fade in animation to any element on the page
const fadeIn = element => {
  element.classList.remove("hide");
  element.classList.add("fadeIn", "animated");
};


// alternative: https://ipapi.co/json
const getIpData = getJSON("https://ipinfo.io/json");

// DOM variables for the intro paragraph only
const introText = document.getElementById("intro-text"),
      clientInfoIP = document.getElementById("ip-address"),
      clientInfoBrowser = document.getElementById("browser"),
      clientInfoSystem = document.getElementById("operating-system"),
      clientInfoPlace = document.getElementById("place");

// function to set the text of the elements defined above using
// the data from client.js and the JSON ip data
function showIntro(ipInfo) {
  setTimeout(() => {
    fadeIn(introText);
    clientInfoIP.innerHTML = ipInfo.ip;
    const clientJS = new ClientJS();
    if (/Edge\/12./i.test(navigator.userAgent))
      // apparently Edge likes to think it's Chrome; according to the user agent...
      clientInfoBrowser.innerHTML = "Edge";
    else
      clientInfoBrowser.innerHTML = clientJS.getBrowser();
    clientInfoSystem.innerHTML = clientJS.getOS();
    clientInfoPlace.innerHTML = ipInfo.city + "," + "\xa0" + ipInfo.country;
  }, timeoutBase + 4000);
}

// if getting the JSON was successful, show the intro paragraph
// (if there was an error, keep the paragraph hidden and display a friendly console message)
getIpData.then(ipInfo => {
  if(ipInfo.ip != undefined)
    showIntro(ipInfo);
}).catch(error => {
  console.log("Hmmm, it seems like there\'s an issue... \n" +
              " - running error handler to hide intro text (and continue to display other content)");
});

// setTimeout to display the footer and the links div, which is why we hid it in the first place.
// the timeout time is based on the intro paragraph being hidden or not.
setTimeout(() => {
  const aboutMe = document.getElementById("about-me"),
        footer = document.getElementById("footer"),
        links = document.getElementById("links");
  setTimeout(() => {
    fadeIn(aboutMe);
    fadeIn(footer);
    fadeIn(links);
  }, (introText.classList.contains("hide") == false) ? timeoutBase * 17 : timeoutBase);
}, timeoutBase * 12);