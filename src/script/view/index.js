import { loadPage, error, loading } from "../utils/helper";
import getCompetitions from "../components/competitions";
import { getSavedTeams } from "../components/team";

const index = () => {
    // activate sidenav
    let elems = document.querySelector(".sidenav");
    M.Sidenav.init(elems);

    let page = window.location.hash.substr(1);
    if(!page || page === "index.html"){
        page = "home";
    }
    
    loadNav();
    //load page content
    load(page);
    // offer user to install the apps
    invokeInstallModal();
};

function loadNav() {
    fetch("pages/navs.html")
        .then(status)
        .then(result => result.text())
        .then(responseText => {
            // load menu items
            document.querySelectorAll(".topnav, .sidenav").forEach(element => {
                element.innerHTML = responseText;
            });

            // add event listener to each menu
            document.querySelectorAll(".topnav a, .sidenav a, a.brand-logo").forEach(element => {
                element.addEventListener("click", clickRedirect);
            });
        })
        .catch(error);
}

function clickRedirect(event) {
    //close sidenav each time menu item is clicked
    let sidenav = document.querySelector(".sidenav");
    M.Sidenav.getInstance(sidenav).close();
    // load menu based on href
    let page = event.target.getAttribute("href").substr(1);
    load(page);
}

function load(page){
    loading(1);
    loadPage(page).then(() => {
        if (page === "home") {
            getCompetitions();
        }
        else {
            getSavedTeams();
        }
    })
    .then(() => loading(0));
}

function invokeInstallModal(){
    window.addEventListener('beforeinstallprompt', event => {
        // Stash the event so it can be triggered later.
        window.deferredPrompt = event;

        const divInstall = document.querySelector("#install-container");
        divInstall.querySelector("#btn-install").addEventListener("click", () => {
            const promptEvent = window.deferredPrompt;
            if (!promptEvent) {
                // The deferred prompt isn't available.
                return;
            }
            // Show the install prompt.
            promptEvent.prompt();
            // Log the result
            promptEvent.userChoice.then((result) => {
                console.log('👍', 'userChoice', result);
                // Reset the deferred prompt variable, since
                // prompt() can only be called once.
                window.deferredPrompt = null;
            });
        });

        divInstall.querySelector("#btn-no-install").addEventListener("click", () => {
            localStorage.setItem("install", "no");
        });

        if(!localStorage.getItem("install")){    
            setTimeout(() => {
                    const modal = M.Modal.init(document.querySelector("#install-container"));
                    modal.open();
            }, 1000);
        }

    });
}

export default index;