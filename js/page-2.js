function hideSpinner() {
  document.getElementById("spinner").classList.add("hidden");
  document.getElementById("spinner").classList.remove("flex");
}
function showSpinner() {
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("spinner").classList.add("flex");
}

const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("dark-icon");
const themeToggleLightIcon = document.getElementById("light-icon");

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

function downloadImage(imageSrc, imageName) {
  fetch(imageSrc)
    .then((response) => {
      return response.blob();
    })
    .then((data) => {
      const href = URL.createObjectURL(data);

      const anchorElement = document.createElement("a");
      anchorElement.href = href;
      anchorElement.download = imageName;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      URL.revokeObjectURL(href);
    });
}

function resizeImage(image) {
  const container = image.parentElement;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  const containerRatio = containerWidth / containerHeight;
  const imageRatio = imageWidth / imageHeight;

  if (containerRatio > imageRatio) {
    image.style.width = "100%";
    image.style.height = "auto";
  } else {
    image.style.width = "auto";
    image.style.height = "100%";
  }
}

const parentElement = document.getElementById("parent");
const breedName = document.getElementById("Breed");

document.addEventListener("DOMContentLoaded", () => {
  showSpinner();

  const query = window.location.search;
  const url = new URLSearchParams(query);
  const value = url.get("value");
  breedName.innerHTML = value;

  fetch(`https://dog.ceo/api/breed/${value}/images`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const Images = data.message;
      Images.forEach((element) => {
        let html = `
              <div class="flex flex-col items-center justify-center md:justify-start lg:justify-start rounded-3xl space-y-4 max-w-md">
                  <div id="image-container">
                      <img
                          id="Dog-image"
                          src=${element}
                          alt="Dog picture"
                          class="rounded-md"
                          onload="resizeImage(this)"
                      />
                  </div>
                  <div>
                      <button
                          id="downloadBtn"
                          onclick="downloadImage('${element}' , 'Dog-image')"
                      >
                              <img src="images/paw.png" alt="" id="paw" />
                          <p>Download</p>
                      </button>
                  </div>
              </div>
          `;
        parentElement.insertAdjacentHTML("beforeend", html);
      });
    });

  hideSpinner();
});
