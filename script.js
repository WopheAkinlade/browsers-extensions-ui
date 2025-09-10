const main = document.getElementById("main");
const themeBtn = document.getElementById("toggleTheme");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const inactiveBtn = document.getElementById("inactive");
const buttons = [allBtn, activeBtn, inactiveBtn];
// Initialising the localStorage variable that determines color mode
let darkmode = localStorage.getItem("darkmode");
let listMode = "all";
let extensions = [];

const loadExtensions = async () => {
  const response = await fetch("data.json");
  extensions = await response.json();
  renderExtensions(listMode)
  console.log("Func")
};

loadExtensions();

// Dark mode logic starts here
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
// Dark mode logic ends here

// Mode switching logic starts here
/**
 * Function for filtering the extensions as needed
 * @param {HTMLButtonElement} button - Button for filtering rendered extensions
 */
const switchModes = (button) => {
  buttons.forEach((item) => {
    if (item.classList.contains("current-mode"))
      item.classList.remove("current-mode");
  });

  button.classList.toggle("current-mode");
  listMode = button.innerText.toLowerCase();
  renderExtensions(listMode);
};

buttons.forEach((item) =>
  item.addEventListener("click", (e) => switchModes(e.target))
);
// Mode switching logic ends here

// Dynamic extension rendering logic starts here
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
const cardBuilder = (item) => {
  const card = createElement("div", "extension-card");
  const cardHead = createElement("div", "card-header");
  const cardDesc = createElement("div", "extension-description");
  const cardFooter = createElement("div", "card-footer");

  const img = createElement("img");
  img.src = item.logo;
  img.alt = item.name;

  const title = createElement("h3", "extension-name", item.name);

  const desc = createElement("p", null, item.description);

  cardDesc.append(title, desc);

  cardHead.append(img, cardDesc);

  const btn = createElement("button", "remove-btn", "Remove");
  btn.id = "remove";

  const label = createElement("label", " ");

  const slider = createElement("input");
  slider.setAttribute("type", "checkbox");
  slider.checked = item.isActive;
  // Checkbox logic starts here
  slider.addEventListener("click", () => {
    item.isActive = slider.checked;
    console.log("Before render: " + item.name, item.isActive);
    renderExtensions(listMode);
  });
  // Checkbox logic ends here

  const circle = createElement("span", "toggle");

  label.append(slider, circle);

  cardFooter.append(btn, label);

  card.append(cardHead, cardFooter);
  requestAnimationFrame(() => card.classList.add("show")) // adds the show class after the browser has rendered to produce animation effect
  return card;
};

/**
 * Function renders the desired extensions depending on the given condition
 * @param {string} mode - all | active | inactive
 */
const renderExtensions = (mode) => {
  main.replaceChildren();

  if (mode === "inactive") {
    const exts = extensions.filter((item) => item.isActive === false);
    exts.forEach((item) => main.appendChild(cardBuilder(item)));
  } else if (mode === "active") {
    const exts = extensions.filter((item) => item.isActive === true);
    exts.forEach((item) => main.appendChild(cardBuilder(item)));
  } else {
    extensions.forEach((item) => main.appendChild(cardBuilder(item)));
  }
};
// Dynamic extension rendering logic ends here
