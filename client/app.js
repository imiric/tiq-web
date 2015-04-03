Meteor.startup(function() {
  $(window).keydown(function(event) {
    if (event.keyCode === 16) {
      $('.tags li > a').attr('contenteditable', true);
    }
  }).keyup(function(event) {
    if (event.keyCode === 16 && Session.equals('editing', false)) {
      $('.tags li > a').attr('contenteditable', false);
    }
  });
});
