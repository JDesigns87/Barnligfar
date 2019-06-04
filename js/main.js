"use strict";

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// set default page
function setDefaultPage() {
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

setDefaultPage();

/*
Fetches json data google spreadsheets
*/

let sheetId = "1ypYnwcLZrCopMJgSTuO4LvmBmVz7-fh5niUkdEKdF9s";
let sheetNumber = 1;
let sheetUrl = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/" + sheetNumber + "/public/full?alt=json";
console.log(sheetUrl);

fetch(sheetUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    appendEvents(json.feed.entry);
  });

/*
Appends json data to the DOM
*/
function appendEvents(events) {
  console.log(events);
  let htmlTemplate = "";
  for (let event of events) {
    htmlTemplate += `
        <article class="news">
          <section>
          <h3>${event['gsx$something']['$t']}</h3>
          <p>${event['gsx$navn']['$t']}</p>
          </section>
          <section>
          <p>Tid: <strong>${event['gsx$tid']['$t']}</strong></p>
          <p>Dato: <strong>${event['gsx$dato']['$t']}</strong></p>
          <p>Sted: <strong>${event['gsx$sted']['$t']}</strong></p>
          <section>
        </article>
      `;
  }
  document.querySelector("#tour").innerHTML += htmlTemplate;
}
