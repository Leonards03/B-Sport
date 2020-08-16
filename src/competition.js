// Library for building asynchronous javascript
import "regenerator-runtime";

// Library
import "./script/vendor/materialize.min.css";
import "./script/vendor/materialize.min.js";
import "./script/styles/style";

import competition from "./script/view/competition";

// services
import "./script/services/services";

document.addEventListener("DOMContentLoaded", competition);