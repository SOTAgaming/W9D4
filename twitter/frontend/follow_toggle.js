const APIUtil = require("./api_util");


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