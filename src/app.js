// Library for building asynchronous javascript
import "regenerator-runtime";

// Library
import "./script/vendor/materialize.min.css";
import "./script/vendor/materialize.min.js";
import "./script/styles/style";

// services
import "./script/services/services";

import index from "./script/view/index";
import team from "./script/view/team";
import competition from "./script/view/competition";

let path = window.location.pathname.substr(1);

// Execute the main function when the DOM loaded
if (path === "competition.html"){
    document.addEventListener("DOMContentLoaded", competition);
} else if (path === "team.html"){
    document.addEventListener("DOMContentLoaded", team);
} else {
    document.addEventListener("DOMContentLoaded", index);
}



