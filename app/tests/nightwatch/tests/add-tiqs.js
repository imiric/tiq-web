var baseUrl = 'http://localhost:3000';

var placeholders = {
  text: {sel: '.text.placeholder', value: 'add text'},
  tag:  {sel: '.tag.placeholder',  value: 'add tag'}
};

module.exports = {
  '"latest tiqs" should be empty': function(client) {
    client.init()
      .waitForElementVisible("body", 1000)
      .assert.elementNotPresent('.latest-tiqs li');
  },

  'tag placeholder should not be present': function(client) {
    client
      .assert.elementNotPresent(placeholders.tag.sel);
  },

  'entering text and pressing Enter should add a new Tiq': function(client) {
    client
      .click(placeholders.text.sel)
      .keys(['cities', client.Keys.ENTER])
      .pause(100)
      .elements('css selector', '.latest-tiqs li', function(result) {
        this.assert.equal(result.value.length, 1, '"latest tiqs" has 1 element');
        this.elementIdText(result.value[0].ELEMENT, function(result) {
          this.assert.equal(result.value, 'cities', '... which is "cities"');
        });
      });
  },

  '... and redirect to the tiq\'s page': function(client) {
    client
      .assert.urlEquals(baseUrl + '/cities');
  },

  'clicking on "tiq" should return to homepage': function(client) {
    client
      .click('h1 a')
      .pause(100)
      .assert.urlEquals(baseUrl + '/')
      .assert.elementPresent(placeholders.text.sel);
  },

  'entering the same text should *not* add a new Tiq': function(client) {
    client
      .click(placeholders.text.sel)
      .keys(['cities', client.Keys.ENTER])
      .pause(100)
      .elements('css selector', '.latest-tiqs li', function(result) {
        this.assert.equal(result.value.length, 1, '"latest tiqs" still has 1 element');
        this.elementIdText(result.value[0].ELEMENT, function(result) {
          this.assert.equal(result.value, 'cities', '... which is "cities"');
        });
      });
  },

  '... but should redirect to the tiq\'s page': function(client) {
    client
      .assert.urlEquals(baseUrl + '/cities');
  },

  'tag placeholder should be present': function(client) {
    client
      .assert.elementPresent(placeholders.tag.sel);
  },

  'entering a tag and pressing Enter should add a new Tiq': function(client) {
    client
      .click(placeholders.tag.sel)
      .keys(['paris', client.Keys.ENTER])
      .pause(100)
      // ... which should appear in the tag list
      .elements('css selector', '#main .tags a', function(result) {
        this.assert.equal(result.value.length, 1, 'tag list has 1 element');
        this.elementIdText(result.value[0].ELEMENT, function(result) {
          this.assert.equal(result.value, 'paris', '... which is "paris"');
        });
      })
      // ... and should appear at the top of the "latest tiqs" list
      .elements('css selector', '.latest-tiqs li', function(result) {
        this.assert.equal(result.value.length, 2, '"latest tiqs" has 2 elements');
        this.elementIdText(result.value[0].ELEMENT, function(result) {
          this.assert.equal(result.value, 'paris', '... and the first one is "paris"');
        });
      });
  },

  '... but the URL shouldn\'t change': function(client) {
    client
      .assert.urlEquals(baseUrl + '/cities');
  },

  'the tag placeholder should remain the active element': function(client) {
    client
      .elementActive(function(result) {
        this.elementIdAttribute(result.value.ELEMENT, 'class', function(result) {
          this.assert.strictEqual(
            (result.value.indexOf('tag') > -1
             && result.value.indexOf('placeholder') > -1), true);
        });
      });
  },

  'adding more tags should repeat the process as for a single one': function(client) {
    // TODO: Figure out why this test fails on PhantomJS, but passes on Firefox.
    client
      .click(placeholders.tag.sel)
      .keys(['amsterdam', client.Keys.ENTER])
      .keys(['cairo', client.Keys.ENTER])
      .keys(['belgrade', client.Keys.ENTER])
      .pause(100)
      // ... which should appear in the tag list
      .elements('css selector', '#main .tags a', function(result) {
        var val = result.value;
        this.assert.equal(val.length, 4, 'tag list has 4 elements');
        this.elementIdText(val[val.length-1].ELEMENT, function(result) {
          this.assert.equal(result.value, 'belgrade', '... and the last one is "belgrade"');
        });
      })
      // ... and should appear in the "latest tiqs" list
      .elements('css selector', '.latest-tiqs li', function(result) {
        this.assert.equal(result.value.length, 5, '"latest tiqs" has 5 elements');
        this.elementIdText(result.value[0].ELEMENT, function(result) {
          this.assert.equal(result.value, 'belgrade', '... and the first one is "belgrade"');
        });
      });
  },

  'clicking on a tag should take to its Tiq page': function(client) {
    client
      .click('#main .tags a:first-child')
      .getText('h3.text', function(result) {
        this.assert.equal(result.value, 'paris', 'header text is "paris"');
      })
      .assert.urlEquals(baseUrl + '/paris')
      .elements('css selector', '#main .tags a', function(result) {
        this.assert.equal(result.value.length, 1, 'tag list has 1 element');
        this.elementIdText(result.value[0].ELEMENT, function(result) {
          this.assert.equal(result.value, 'cities', '... which is "cities"');
        });
      })
      .end();
  },
};
