// as inspiration, this was used:
// https://github.com/picocss/pico/discussions/381#discussioncomment-11458491
const THEME_TOGGLE_ID = "theme-switch";

window.onload = (_event) => {
    const theme = getThemeOrDefault();
    setHtmlTheme(theme);
    setToggleValue(theme);
}

function getThemeOrDefault() {
    return localStorage.getItem("theme") || "dark";
}

function setHtmlTheme(theme) {
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-theme", theme);
}

function setToggleValue(theme) {
    const toggleElement = document.getElementById(THEME_TOGGLE_ID);
    toggleElement.checked = getToggleValue(theme);
}

function getToggleValue(theme) {
    return theme === "light";
}

document.getElementById(THEME_TOGGLE_ID)
    .addEventListener("change", (event) => {
        (event.target.checked)
            ? localStorage.setItem("theme", "light")
            : localStorage.setItem("theme", "dark")
        const theme = getThemeOrDefault();
        setHtmlTheme(theme);
    });
