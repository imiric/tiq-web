Meteor.startup(function() {
  $(window).keydown(function(event) {
    if (event.keyCode === 16) {
      $('.tags li > a').attr('contenteditable', true);
    }
  }).keyup(function(event) {
    if (event.keyCode === 16) {
      $('.tags li > a'
        ).not(':eq(' + Session.get('editing') + ')'
        ).attr('contenteditable', false);
    }
  });
});

Template.registerHelper('encodeText', function(text) {
  return encodeURIComponent(text);
});
