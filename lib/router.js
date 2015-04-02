Router.configure({
  layoutTemplate: 'home'
});

Router.map(function() {
  this.route('home', {
    path: '/:text'
  });
});
