let timeoutBase = 500;

function updateScroll(){
  const intro = document.getElementById("intro");
  intro.scrollTop = intro.scrollHeight;
}

const headline = document.getElementById("main-heading");
setTimeout(() => {
  headline.classList.remove("hide");
  headline.classList.add("fadeInDown", "animated");
  headline.classList.add("glitch");
  updateScroll();
}, timeoutBase + 1100);

/*
TODO: use promises (maybe?)
https://developers.google.com/web/fundamentals/primers/promises#promise-terminology
*/
const getJSON = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = () => {
    let status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

const introText = document.getElementById("intro-text");
const clientInfoIP = document.getElementById("ip-address");
const clientInfoBrowser = document.getElementById("browser");
const clientInfoSystem = document.getElementById("operating-system");
const clientInfoPlace = document.getElementById("place");

getJSON("https://ipinfo.io/json", (err, ipInfo) => {
  if (ipInfo && ipInfo != "" && ipInfo.ip != undefined && ipInfo.ip != "undefined") {
    setTimeout(() => {
      introText.classList.remove("hide");
      introText.classList.add("fadeIn", "animated");
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
  else {
    alert("oops! it seems like there's an issue.");
  }
});

function parallaxScroll(){
  let parallax = document.querySelectorAll(".parallax"), speed = 0.5;
  window.onscroll = () => {
    [].slice.call(parallax).forEach((el,i) => {
      var windowYOffset = window.pageYOffset,
          bgPos = "50% " + (windowYOffset * speed) + "px";
      el.style.backgroundPosition = bgPos;
    });
  };
}

setTimeout(() => {
  const aboutMe = document.getElementById("about-me");
  setTimeout(() => {
    aboutMe.classList.remove("hide");
    aboutMe.classList.add("fadeIn", "animated");
  }, (introText.classList.contains("hide") == false) ? timeoutBase * 20 : timeoutBase);
}, timeoutBase * 12);