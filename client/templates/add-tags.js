var addTiq = function(ctx, el, template) {
  var text = el.text();

  if (ctx.text) {
    // Adding a new tag to existing text
    Meteor.call('associateTags', ctx.text, [text]);
    template.$('.tag').eq(0).focus();
  } else {
    // Adding new text
    el.removeClass('placeholder');
    Meteor.call('associateTags', text, []);
    Router.go('home', {text: text});
    template.$('.tag').eq(0).focus();
  }
};

Template.addTags.events({
  'keydown .text, keydown .tag': function(event, template) {
    if (_.contains([9, 13], event.keyCode)) {
      event.target.blur();
      return false;
    }
  },

  'blur .text, blur .tag': function(event, template) {
    var el = template.$(event.target),
        text = el.text(),
        elType = el.hasClass('tag') ? 'tag' : 'text';

    if (!text) {
      el.addClass('placeholder');
      el.text('add ' + elType);
    } else if (text != this && text != this.text) {
      addTiq(this, el, template);
    }

    return false;
  },

  'click .tag': function(event, template) {
    // Stop handling anchor clicks
    // TODO: Override this with a Shift+click.
    return false;
  },

  'focus .text, focus .tag': function(event, template) {
    var el = template.$(event.target);
    if (el.hasClass('placeholder')) {
      el.text('');
    }
  }
});
