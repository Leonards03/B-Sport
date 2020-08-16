function loadPage(page) {
    return fetch(`pages/${page}.html`)
        .then(status)
        .then(response => response.text())
        .then(responseText => {
            const content = document.querySelector("#body-content");
            content.innerHTML = responseText;
            M.AutoInit();
        })
        .catch(error);
}

//code that would be called when the fetch success
function status(response) {
    if (response.status !== 200) {
        if (response.status === 404) {
            loadPage(404);
        } else {
            loadPage("restricted");
        }

        // Promise Reject to invoke catch block
        return Promise.reject(response.statusText);
    }
    return Promise.resolve(response);
}

// JSON parse code
function json(response) {
    if (!Array.isArray(response)) return response.json();
    return response.map(item => item.json());
}

function error(error) {
    console.error("Error: ", error.stack);
}

function redirect(url) {
    window.location.replace(url);
}

function capitalize(text) {
    // old ways
    // return text.charAt("0").toUpperCase() + text.slice(1).toLowerCase();

    // using regex to find uppercase other than first letter, 
    // the second argument is a function to make it lowercase
    return text.replace(/\B[A-Z]/g, x => x.toLowerCase());
}

function replaceUnderscore(text) {
    return text.replace(/_/g, " ");
}

function replaceUnderscoreAndCapitalize(text) {
    text = replaceUnderscore(text);
    return capitalize(text);
}

function sortObjectArrayById(array) {
    return array.sort((a, b) => a.id - b.id);
}

function groupBy(array, key) {
    return array.reduce((group, value) => {
        (group[value[key]] = group[value[key]] || []).push(value);
        return group;
    }, [])
}

function loading(state) {
    let preloader = document.querySelector(".preloader-wrapper");
    let content = document.querySelector("#body-content");

    if (preloader && content) {
        if(state){
            preloader.classList.remove("hide")
            content.classList.add("hide");
        } else {
            preloader.classList.add("hide")
            content.classList.remove("hide");
            M.AutoInit();
        }
    }
}

export {
    loadPage,
    status,
    json,
    error,
    redirect,
    capitalize,
    replaceUnderscore,
    replaceUnderscoreAndCapitalize,
    sortObjectArrayById,
    groupBy,
    loading
}