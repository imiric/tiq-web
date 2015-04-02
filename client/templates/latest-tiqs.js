Template.latestTiqs.helpers({
  tiqs: function(count) {
    return Tiqs.find({}, {limit: count, sort: {createdAt: -1}});
  }
});
