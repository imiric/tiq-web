var setTiq = function(ctx, el, template) {
  var text = el.text(),
      editing = Session.get('editing');

  if (!_.isUndefined(editing)) {
    Meteor.call('updateTiq', ctx.parent, text);
    if (editing === -1) {
      Router.go('/' + encodeURIComponent(text));
    }
  } else if (ctx.parent) {
    // Add a new tag to an existing Tiq
    Meteor.call('associateTags', ctx.parent, [text]);
  } else {
    // Add a new Tiq
    el.removeClass('placeholder');
    Meteor.call('associateTags', text, []);
    Router.go('/' + encodeURIComponent(text));
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

Template.addTiqs.helpers({
  editable: function(type) {
    var value = this.text, classes = '';
    if (!value) {
      value = 'add ' + type;
      classes = 'placeholder';
    }
    return TEMPLATES[type]({value: value, classes: classes});
  }
});

Template.addTiqs.events({
  'keydown .text, keydown .tag': function(event, template) {
    if (_.contains([9, 13], event.keyCode)) {
      var el = template.$(event.target),
          text = el.text(),
          ctx = this.text ? {parent: this.text} : this;

      setTiq(ctx, el, template);

      if (el.hasClass('placeholder') && !el.hasClass('text')) {
        el.html('<br>');
      } else {
        Session.set('modified', true);
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

    if (!text || !Session.equals('modified', true)) {
      el.text(origText);
    }

    Session.set('modified', undefined);
    Session.set('editing', undefined);
    if (!el.hasClass('placeholder') && !el.hasClass('text')) {
      el.attr('contenteditable', false);
    }
    return false;
  },

  'focus .text.placeholder, focus .tag.placeholder': function(event, template) {
    event.target.innerHTML = '<br>';
  },

  'click .text:not(.placeholder)': function(event, template) {
    Session.set('editing', -1);
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
