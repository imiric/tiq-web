Template.addTags.events({
  'click button': function(ev, template) {
    var text = template.$('input[name="text"]').val(),
        tags = template.$('input[name="tags"]').val().split(',');

    Meteor.call('associateTags', text, tags);
  }
});
