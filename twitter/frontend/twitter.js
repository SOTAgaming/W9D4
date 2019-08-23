const FollowToggle =  require("./follow_toggle");
const UsersSearch = require("./follow_toggle");
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