let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
function createAndAppendSearchResult(result) {
    let { title, link, description } = result;

    //1. Div container -- result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //2. Anchor Title -- result-title
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank"; // Target is for New Open New Tab
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    //3. Tittle Break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //4. Anchor URL -- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    //5. Line Break
    let lineBreakEl = document.createElement("br")
    resultItemEl.appendChild(lineBreakEl);

    //6. Paragraph-Description -- line-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}
function  displayResults(search_results) {
  spinnerEl.classList.toggle("d-none"); // Hide Spinner of after fetch data
    for (let result of search_results) {         // Displaying Multiple Result
      createAndAppendSearchResult(result);
    }
}
function searchWikipedia(event) {
    if (event.key === "Enter") {
      spinnerEl.classList.toggle("d-none"); // Display Spinner while fetching data From Server
      searchResultsEl.textContent = "";  // For clearing Previous Result
      let searchInput = searchInputEl.value;
      let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
      let options = {
        method: "GET"
      };
      fetch(url, options)
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonData) {
          let { search_results } = jsonData;
          displayResults(search_results);
        });
    }
  }
searchInputEl.addEventListener("keydown", searchWikipedia);