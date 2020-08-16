// Library for building asynchronous javascript
import "regenerator-runtime";

// Library
import "./script/vendor/materialize.min.css";
import "./script/vendor/materialize.min.js";
import "./script/styles/style";

import team from "./script/view/team";

// services
import "./script/services/services";

document.addEventListener("DOMContentLoaded", team);