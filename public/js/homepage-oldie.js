"use strict";

// the base time for all the setTimeout functions
var timeoutBase = 500;
var headline = document.getElementById("main-heading");
// apply function whether it's the user's first visit or not
var notFirstVisit = function notFirstVisit(boolean) {
  var span = document.getElementById("notFirstVisit");
  // if it isn't the user's first visit, display the "again" in the headline
  if (boolean === true) {
    span.classList.remove("hide");
    headline.setAttribute("data-text", "Hello again, stranger.");
  }
  // if it is the user's first time, then set the localStorage variable for next time
  else {
      localStorage.noFirstVisit = true;
    }
};
// apply animations to the homepage headline
setTimeout(function () {
  // check if it is user's first visit (depending on that, display or hide the "again" span)
  !localStorage.noFirstVisit ? notFirstVisit(false) : notFirstVisit(true);
  // show the headline
  headline.classList.remove("hide");
  headline.classList.add("glitch");
}, timeoutBase + 1100);

// generic function to un-hide any element on the page
var show = function show(element) {
  element.classList.remove("hide");
};

// DOM variables for the intro paragraph only
var introText = document.getElementById("intro-text");
// DOM variables for the about paragraph
var aboutText = document.getElementById("about-text");

// setTimeout to display the footer and the links div, which is why we hid it in the first place.
// the timeout time is based on the intro paragraph being hidden or not.
setTimeout(function () {
  var aboutMe = document.getElementById("about-me"),
      footer = document.getElementById("footer"),
      links = document.getElementById("links");
  setTimeout(function () {
    show(aboutMe);
    show(aboutText);
    footer.ondragstart = function () {
      return false;
    };
  }, introText.classList.contains("hide") == false && clientInfoBrowser.innerHTML !== "" ? timeoutBase * 17 : timeoutBase);
}, timeoutBase * 12);