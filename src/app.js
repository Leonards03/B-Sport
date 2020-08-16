// Library for building asynchronous javascript
import "regenerator-runtime";

// Library
import "./script/vendor/materialize.min.css";
import "./script/vendor/materialize.min.js";
import "./script/styles/style";

import index from "./script/view/index";

// services
import "./script/services/services";

// Execute the main function when the DOM loaded
document.addEventListener("DOMContentLoaded", index);