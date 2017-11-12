let timeoutBase = 500;

function updateScroll(){
  const intro = document.getElementById("intro");
  intro.scrollTop = intro.scrollHeight;
}

const headline = document.getElementById("main-heading");
setTimeout(() => {
  headline.classList.remove("hide");
  headline.classList.add("fadeInDown", "animated", "glitch");
  updateScroll();
}, timeoutBase + 1100);

const getJSON = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      let status = xhr.status;
      status == 200 ? resolve(xhr.response) : reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
};

// alternative: https://ipapi.co/json
const getIpData = getJSON("https://ipinfo.io/json");

const introText = document.getElementById("intro-text"),
      clientInfoIP = document.getElementById("ip-address"),
      clientInfoBrowser = document.getElementById("browser"),
      clientInfoSystem = document.getElementById("operating-system"),
      clientInfoPlace = document.getElementById("place");

function showIntro(ipInfo) {
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

getIpData.then(ipInfo => {
  if(ipInfo && ipInfo != "" && ipInfo.ip != undefined && ipInfo.ip != "undefined")
    showIntro(ipInfo);
}).catch(error => {
  console.log('Hmmm, it seems like there\'s an issue... \n' +
              ' - running error handler to hide intro text (and continue to display other content)');
});

function parallaxScroll(){
  let parallax = document.querySelectorAll(".parallax"), 
      speed = (document.documentElement.clientWidth < 420) ? 0 : 0.5;
      
  window.onscroll = () => {
    [].slice.call(parallax).forEach((el,i) => {
      var windowYOffset = window.pageYOffset,
          bgPos = "50% " + (windowYOffset * speed) + "px";
      el.style.backgroundPosition = bgPos;
    });
  };
}

setTimeout(() => {
  const aboutMe = document.getElementById("about-me"),
        footer = document.getElementById("footer");
  setTimeout(() => {
    aboutMe.classList.remove("hide");
    aboutMe.classList.add("fadeIn", "animated");
    footer.classList.remove("hide");
    footer.classList.add("fadeIn", "animated");
  }, (introText.classList.contains("hide") == false) ? timeoutBase * 17 : timeoutBase);
}, timeoutBase * 12);