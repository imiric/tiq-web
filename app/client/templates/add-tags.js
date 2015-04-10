var addTiq = function(ctx, el, template) {
  var text = el.text();

  if (ctx.text) {
    // Adding a new tag to existing text
    Meteor.call('associateTags', ctx.text, [text]);
  } else {
    // Adding new text
    el.removeClass('placeholder');
    Meteor.call('associateTags', text, []);
    Router.go('home', {text: text});
    // FIXME: This doesn't work.
    template.$('.tags .tag').eq(0).focus();
  }
};

// Workaround for making Meteor work with contenteditable elements.
// See https://github.com/meteor/meteor/issues/1964#issuecomment-57948734.
var TEMPLATES = {
  'text': _.template('<h3 class="text <%= classes %>" '
                   + 'data-placeholder="add text" '
                   + 'contenteditable="true">'
                   + '<%= value %></h3>'),
  'tag': _.template('<p class="tag <%= classes %>" '
                   + 'data-placeholder="add tag" '
                   + 'contenteditable="true">'
                   + '<%= value %></p>')
};

Template.addTags.helpers({
  editable: function(type) {
    var value = this.text, classes = '';
    if (!value) {
      value = 'add ' + type;
      classes = 'placeholder';
    }
    return TEMPLATES[type]({value: value, classes: classes});
  }
});

Template.addTags.events({
  'keydown .text, keydown .tag': function(event, template) {
    if (_.contains([9, 13], event.keyCode)) {
      var el = template.$(event.target),
          text = el.text(),
          ctx = this.parent ? {text: this.parent} : this;

      addTiq(ctx, el, template);

      if (el.hasClass('placeholder') && !el.hasClass('text')) {
        el.html('<br>');
      } else {
        event.target.blur();
      }
      return false;
    }
  },

  'blur .text, blur .tag': function(event, template) {
    var el = template.$(event.target),
        text = el.text(),
        origText = this.text;

    // TODO: Simplify this mess.
    if (!text || el.hasClass('placeholder')) {
      origText = el.data('placeholder');
    }

    if (!text || text != origText) {
      el.text(origText);
    }

    Session.set('editing', null);
    if (!el.hasClass('placeholder') && !el.hasClass('text')) {
      el.attr('contenteditable', false);
    }
    return false;
  },

  'focus .text.placeholder, focus .tag.placeholder': function(event, template) {
    event.target.innerHTML = '<br>';
  },

  'click .tag:not(.placeholder)': function(event, template) {
    var el = template.$(event.target),
        idx = $('.tags li > a').index(el);
    if (event.shiftKey || Session.equals('editing', idx)) {
      Session.set('editing', idx);
      return false;
    }
  }
});
