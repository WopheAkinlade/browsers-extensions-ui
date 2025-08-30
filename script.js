const main = document.getElementById("main");
const themeBtn = document.getElementById("toggleTheme");
let darkmode = localStorage.getItem("darkmode");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkMode();

themeBtn.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});

/**
 * Function creates an element with the given parameters and returns the element
 * @param {string} tag - the suitable HTML tag for this element
 * @param {string} className - the class of the element
 * @param {string} content - text content contained by the element if needed
 * @returns HTML element with the provided attributes
 */
const createElement = (tag, className, content) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.textContent = content;
  return el;
};

/**
 * Function that builds a card component. It calls the createElement function multiple times.
 * @param {object} data - object containing `logo`, `img`, `description` keys and values
 * @returns HTML element contain
 */
const cardBuilder = (data) => {
  const card = createElement("div", "extension-card");
  const cardHead = createElement("div", "card-header");
  const cardDesc = createElement("div", "extension-description");
  const cardFooter = createElement("div", "card-footer");

  const img = createElement("img");
  img.src = data.logo;
  img.alt = data.name;

  const title = createElement("h3", "extension-name", data.name);

  const desc = createElement("p", null, data.description);

  cardDesc.append(title, desc);

  cardHead.append(img, cardDesc);

  const btn = createElement("button", "remove-btn", "Remove");
  btn.id = "remove";

  const label = createElement("label", " ");

  const slider = createElement("input");
  slider.setAttribute("type", "checkbox");
  slider.id = "toggle";

  const circle = createElement("span", "toggle");

  label.append(slider, circle);

  cardFooter.append(btn, label);

  card.append(cardHead, cardFooter);
  return card;
};

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // You can work with the parsed JSON data here
    data.forEach(item => main.appendChild(cardBuilder(item)))
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });
