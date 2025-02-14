let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppend(item) {
    let resultContainer = document.createElement("div");
    let {
        title,
        link,
        description
    } = item;

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank"
    titleEl.textContent = title;
    resultContainer.appendChild(titleEl);

    let breakEl = document.createElement("br");
    resultContainer.appendChild(breakEl)

    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.textContent = link;
    linkEl.target = "_blank"
    linkEl.style.color = "green";
    resultContainer.appendChild(linkEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    resultContainer.appendChild(descriptionEl);

    searchResults.appendChild(resultContainer);
}

function displayResults(search_results) {
    spinner.classList.add("d-none");
    for (let item of search_results) {
        createAndAppend(item);
    }
}

function searching(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.remove("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput.value;
        fetch(url)
            .then(function(responce) {
                return responce.json();
            })
            .then(function(filejson) {
                console.log(JSON.stringify(filejson));
                let {
                    search_results
                } = filejson;
                displayResults(search_results);
            })
    }
}

searchInput.addEventListener("keydown", searching);