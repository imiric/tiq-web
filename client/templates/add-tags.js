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
    // FIXME: This doesn't work.
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
    } else if (text != this && text != this.text && text != this.tag) {
      addTiq(this, el, template);
    }

    Session.set('editing', false);
    return false;
  },

  'focus .text, focus .tag': function(event, template) {
    var el = template.$(event.target);
    if (el.hasClass('placeholder')) {
      el.text('');
    }
  }
});

Template.tag.events({
  'click': function(event, template) {
    if (event.shiftKey || Session.equals('editing', true)) {
      var el = template.$(event.target);
      // Disable editing of all other tags, in order to show the hand pointer
      // on hover, indicating to the user that clicking on the others will
      // follow the link. Technically, this still doesn't work properly in
      // Chrome, but does in Firefox. :-/
      el.parents('ul').find('a.tag').not(el).attr('contenteditable', false);
      Session.set('editing', true);
      return false;
    }
  },
});
