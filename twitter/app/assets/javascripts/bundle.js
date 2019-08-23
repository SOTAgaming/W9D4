/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: "JSON"
    });
   
  },
  searchUsers: queryval => {
    return $.ajax({
      method: "GET",
      url: "/users/search",
      data: {
         query: queryval       
      },
      dataType: "JSON"
    });
  },

  unfollowUser: id => {
    return $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: "JSON"
    });
  }
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");


function FollowToggle(el){
  this.userId = el.data("user-id");
  this.followState = (el.data("initial-follow-state") === false) ? "following" : "unfollowing"; 
  this.$el = $(el);
  this.render();
  this.handleClick();
}
FollowToggle.prototype.render = function(){
  this.followState === "unfollowing" ? this.$el.text("Unfollow!") : this.$el.text("Follow!");
};

FollowToggle.prototype.toggle = function() {
  console.log(`${this.followState}`);
  this.followState = (this.followState === "unfollowing") ? "following" : "unfollowing"; 
  console.log(`${this.followState}`);
  this.render();
  this.$el.removeProp("disabled");
};
FollowToggle.prototype.handleClick = function(){
  let $button = this.$el;
  let that = this;
  
    this.$el.on("click", function(e){
      $button.prop("disabled")
      if ($button.text() === "Follow!") {
      // $button.text("Unfollow!");
      // return $.ajax({
      //     method: "POST",
      //     url: `/users/${$button.data("user-id")}/follow`,
      //     dataType: "JSON"
      // });
         APIUtil.followUser($button.data("user-id")).then(that.toggle());


    } else {
        // $button.text("Follow!");

        // return $.ajax({
        //   method: "DELETE",
        //   url: `/users/${$button.data("user-id")}/follow`,
        //   dataType: "JSON"
        // });
        APIUtil.unfollowUser($button.data("user-id")).then(that.toggle());
    }
    });
   
};

module.exports = FollowToggle

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle =  __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
$( () => {
    let $instanceButton = $(".follow-toggle");
    let $buttons = Array.from($instanceButton);
    let $usersSearch = $(".users-search");
    let $users = Array.from($usersSearch);
    let search = new UsersSearch($usersSearch);


    for (let i = 0; i < $buttons.length; i++) {
      let $button = $buttons[i];
      let follow = new FollowToggle($($button));
    }

}); 

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map