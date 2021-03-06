Router.configure({
  layoutTemplate: 'home'
});

Router.map(function() {
  this.route('home', {
    path: '/:text?',
    data: function() {
      return Tiqs.findOne({text: this.params.text});
    }
  });
});
