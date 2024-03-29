async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}
async function load(whatToLoad, display) {
    const content = document.getElementById("contentContainer");
    content.scrollTo(0, 0);
    document.title = "Home Project ~ " + display;
    content.innerHTML = await fetchHtmlAsText(whatToLoad);
}
function EnableBackend() {
    window.open("http://127.0.0.1:5000", "_blank");
}