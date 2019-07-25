// the base time for all the setTimeout functions
let timeoutBase = 400;

const headline = document.getElementById("main-heading");
// apply function whether it's the user's first visit or not
let isFirstVisit = (bool) => {
  const span = document.getElementById("notFirstVisit");
  // if it isn't the user's first visit, display the "again" in the headline
  bool ? (
    // if it is the user's first time, then set the localStorage variable for next time
    localStorage.noFirstVisit = true) :
    (span.classList.remove("hide"),
    headline.setAttribute("data-text", "Hello again, stranger."));
};

// generic function to apply fade in animation to any element on the page
const fadeIn = element => {
  element.classList.remove("hide");
  element.classList.add("fadeIn");
};

// apply animations to the homepage headline
setTimeout(() => {
  // check if it is user's first visit (depending on that, display or hide the "again" span)
  (!localStorage.noFirstVisit) ? isFirstVisit(true) : isFirstVisit(false);
  // show the headline
  fadeIn(headline);
  headline.classList.add("glitch");
}, timeoutBase);

// TODO: rewrite JSON logic using the fetch API
// XHR Promise function to GET json data
const getJSON = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = () => {
      let status = xhr.status;
      status == 200 ? resolve(xhr.response) : reject({
        status: xhr.status
      });
    };
    xhr.onerror = () => {
      reject({
        status: xhr.status
      });
    };
    xhr.send();
  });
};

const promiseTimeout = (ms, promise) => {
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject('fetching IP info taking too long')
    }, ms)
  })

  // Returns a race between our timeout and the passed in promise
  return Promise.race([
    promise,
    timeout
  ])
}

// alternative: https://ipapi.co/json
const getIpData = promiseTimeout(timeoutBase, getJSON("https://ipinfo.io/json"));

// DOM variables for the intro paragraph only
const introText = document.getElementById("intro-text"),
      clientInfoIP = document.getElementById("ip-address"),
      clientInfoBrowser = document.getElementById("browser"),
      clientInfoSystem = document.getElementById("operating-system"),
      clientInfoPlace = document.getElementById("place");

// DOM variable for the about paragraph
const aboutText = document.getElementById("about-text");

// function to set the text of the elements defined above using
// the data from client.js and the JSON ip data
let clientJS = new ClientJS();
let showIntro = (ipInfo) => {
  setTimeout(() => {
    clientInfoIP.innerHTML = ipInfo.ip;
    if (/Edge\/12./i.test(navigator.userAgent))
      // apparently Edge likes to think it's Chrome; according to the user agent...
      clientInfoBrowser.innerHTML = "Edge";
    else
      clientInfoBrowser.innerHTML = clientJS.getBrowser();
    clientInfoSystem.innerHTML = clientJS.getOS();
    clientInfoPlace.innerHTML = ipInfo.city + "," + "\xa0" + ipInfo.country;
    fadeIn(introText);
  }, timeoutBase + 400);
};

// if getting the JSON was successful, show the intro paragraph
// (if there was an error (or if it's taking too long), keep the paragraph hidden and display a friendly console message)
getIpData.then(ipInfo => {
  (ipInfo.ip !== "" && clientJS.getBrowser() !== "" && ipInfo.city !== "") && showIntro(ipInfo);
}).catch(error => {
  console.log(error);
  console.log("Hmmm, it seems like there\'s an issue... \n" +
              " - hiding intro text (continuing to display other content)");
});

// setTimeout to display the rest of the content
// the timeout time is based on the intro paragraph being hidden or not.
setTimeout(() => {
  const aboutMe = document.getElementById("about-me"),
        footer = document.getElementById("footer"),
        links = document.getElementById("links");
  setTimeout(() => {
    fadeIn(aboutMe);
    fadeIn(aboutText);
    footer.ondragstart = () => false;
  }, (introText.classList.contains("hide") == false && (clientInfoBrowser.innerHTML !== "")) ? timeoutBase * 14 : timeoutBase);
}, timeoutBase + 500);
