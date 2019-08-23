const APIUtil = require("./api_util");

function UsersSearch (el) {
  this.$el = el;
  this.$input = $(`.user-input`);
  this.$ul = $(`.users`);
}
UsersSearch.prototype.handleInput = function(){
  let input = this.$input.value();
  this.$el.on("keydown", APIUtil.searchUsers(input));
  
};


module.exports = UsersSearch