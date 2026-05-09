import { PAGE_ARRAY } from "../const.js";

// Create dropdown
const navContainer = document.getElementById("navigation-dropdown-container");
const select = document.createElement("select");

// Option management
PAGE_ARRAY.forEach(page => {
    const option = document.createElement("option");
    option.value = page.link;
    option.textContent = page.name;
    select.appendChild(option);
});
const current = window.location.pathname.split("/").pop();
select.value = current;

// Handle navigation
select.addEventListener("change", (e) => {
    const url = e.target.value;
    if (url) {
        window.location.href = url;
    }
});

navContainer.appendChild(select);
