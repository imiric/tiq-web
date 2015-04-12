Meteor.startup(function () {
  Tiqs._ensureIndex({text: 1});
});

Meteor.methods({
  associateTags: function(text, tags) {
    Tiqs.upsert({text: text},
      {$addToSet: {tags: {$each: tags}},
       $setOnInsert: {createdAt: Date.now()}
      }
    );

    _.each(tags, function(tag) {
      Tiqs.upsert({text: tag},
        {$addToSet: {tags: text}, $setOnInsert: {createdAt: Date.now()}}
      );
    });
  },

  updateTiq: function(oldName, newName) {
    var tiq = Tiqs.findOne({text: oldName});
    if (!tiq) return;

    Tiqs.update(tiq._id, {$set: {text: newName}});

    _.each(tiq.tags, function(tag) {
      Tiqs.update({text: tag, tags: oldName},
        {$set: {'tags.$': newName}}
      );
    });
  }
});
