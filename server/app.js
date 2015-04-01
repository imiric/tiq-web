Meteor.startup(function () {
  Tiqs._ensureIndex({text: 1});
});

Meteor.methods({
  associateTags: function(text, tags) {
    Tiqs.upsert({text: text}, {$addToSet: {tags: {$each: tags}}});

    _.each(tags, function(tag) {
      Tiqs.upsert({text: tag}, {$addToSet: {tags: text}});
    });
  }
});
