const sortedName = {};
let createNameArray;
const dogNames = [];
const spinnerAppearance = document.getElementById("spinner");
function showSpinner() {
  spinnerAppearance.classList.remove("hidden");
  spinnerAppearance.classList.add("flex");
}

function hideSpinner() {
  spinnerAppearance.classList.add("hidden");
  spinnerAppearance.classList.remove("flex");
}
const searchInput = document.getElementById("search");
const suggestion = document.getElementById("suggestion");
const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("dark-icon");
const themeToggleLightIcon = document.getElementById("light-icon");
const first = document.getElementById("firstOrder");
const second = document.getElementById("secondOrder");

document.addEventListener("DOMContentLoaded", fetchDataAndInitialize);

function fetchDataAndInitialize() {
  showSpinner();
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const breeds = data.message;
      createNameArray = Object.keys(breeds).reduce((acc, name) => {
        dogNames.push(name);
        let firstLetter = name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(name);
        return acc;
      }, {});

      const storedOption = localStorage.getItem("selectedOption");
      if (storedOption === "Descending") {
        second.setAttribute("selected", "selected");
        if (first.hasAttribute("selected")) first.removeAttribute("selected");
        Descending(createNameArray);
      } else {
        first.setAttribute("selected", "selected");
        if (second.hasAttribute("selected")) second.removeAttribute("selected");
        Ascending(createNameArray);
      }
      hideSpinner();
    });
}

const option = document.getElementById("select");
option.addEventListener("change", () => {
  const selectedValue = option.value;
  localStorage.setItem("selectedOption", selectedValue);
  if (selectedValue === "Ascending") {
    Ascending(createNameArray);
  } else {
    Descending(sortedName);
  }
});

function Ascending(createNameArray) {
  Object.keys(createNameArray)
    .sort()
    .forEach((key) => {
      sortedName[key] = createNameArray[key].sort();
    });
  renderName(sortedName);
}

function Descending(sortedName) {
  const reversedSortedName = {};
  Object.keys(sortedName)
    .reverse()
    .forEach((key) => {
      reversedSortedName[key] = sortedName[key];
    });

  renderName(reversedSortedName);
}

function renderName(data) {
  const list = document.getElementById("list");
  list.textContent = "";

  for (const [group, names] of Object.entries(data)) {
    const groupHeading = document.createElement("h2");
    groupHeading.classList.add("head");
    groupHeading.textContent = group;
    list.appendChild(groupHeading);
    const namesList = document.createElement("div");
    namesList.classList.add("container");
    list.appendChild(namesList);
    for (const name of names) {
      const nameItem = document.createElement("a");
      nameItem.classList.add("list");
      nameItem.setAttribute("href", "#");
      nameItem.textContent = name;
      namesList.appendChild(nameItem);

      // Add event listener to the dynamically created list item
      nameItem.addEventListener("click", (e) => {
        e.preventDefault();
        clear();
        showSpinner();
        const imageSrc = nameItem.textContent;
        window.location.href = `page-2.html?value=${imageSrc}`;
      });
    }
  }
}

function clear() {
  searchInput.value = "";
}

if (localStorage.getItem("color-theme") === "dark") {
  document.documentElement.classList.add("dark");
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

themeToggleBtn.addEventListener("click", toggleMode);

function toggleMode() {
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  }
}

searchInput.onkeyup = (e) => {
  e.preventDefault();
  let userData = e.target.value;
  let suggestionList = [];
  if (userData) {
    suggestionList = dogNames.filter((data) => {
      return data.toUpperCase().startsWith(userData.toUpperCase());
    });

    suggestionList = suggestionList.map((data) => {
      return (data = `<a href="" class="suggest">${data}</a>`);
    });
    suggestion.classList.add("active");
  } else {
    suggestion.classList.remove("active");
  }

  showSuggestion(suggestionList);
};

function showSuggestion(list) {
  let listInfo;
  if (!list.length) {
    listInfo = "";
    suggestion.classList.remove("active");
  } else {
    listInfo = list.join("");
  }

  suggestion.innerHTML = listInfo;
  const anchors = suggestion.querySelectorAll("a.suggest");
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      const imageSrc = event.target.innerText;
      clear();
      window.location.href = `page-2.html?value=${imageSrc}`;
    });
  });
}

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userValue = searchInput.value.toLowerCase();
  const match = dogNames.filter((getMatch) => {
    return userValue === getMatch.toLowerCase();
  });

  if (match.length == 0) {
    suggestion.innerHTML = `<a href="" class="suggest">Unknown breed</a>`;
  } else {
    clear();
    window.location.href = `page-2.html?value=${userValue}`;
  }
});

searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    userValue = searchInput.value.toLowerCase();
    const match = dogNames.filter((getMatch) => {
      return userValue === getMatch.toLowerCase();
    });

    if (match.length == 0) {
      suggestion.innerHTML = `<a href="" class="suggest">Unknown breed</a>`;
    } else {
      clear();
      window.location.href = `page-2.html?value=${userValue}`;
    }
  }
});
