"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _api = _interopRequireDefault(require("./routes/api"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import connection from './config/connectDB';

//For env File 
_dotenv["default"].config();
var app = (0, _express["default"])();
var port = process.env.PORT || 8080;

// cors config
(0, _cors["default"])(app);

//connection();

//config body-parser
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));

//config cookie parser
app.use((0, _cookieParser["default"])());

// Routes
(0, _api["default"])(app);
app.get('/', function (req, res) {
  res.send('Welcome to Ecommerce Server');
});
app.listen(port, function () {
  console.log("Ecommerce Server is running at http://localhost:".concat(port));
});