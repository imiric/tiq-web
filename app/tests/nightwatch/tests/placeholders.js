var placeholders = {
  text: {sel: '.text.placeholder', value: 'add text'},
  tag:  {sel: '.tag.placeholder',  value: 'add tag'}
};

module.exports = {
  'element should have placeholder text': function(client) {
    client.init()
      .waitForElementVisible("body", 1000)
      .assert.attributeEquals(placeholders.text.sel,
          'data-placeholder', placeholders.text.value)
      .getText(placeholders.text.sel, function(result) {
        this.assert.equal(result.value, placeholders.text.value,
          'placeholder is "' + placeholders.text.value + '"');
      })
  },

  'placeholder should clear on focus': function(client) {
    client
      .click(placeholders.text.sel)
      .getText(placeholders.text.sel, function(result) {
        this.assert.equal(result.value, '', 'placeholder is blank');
      })
  },

  'placeholder should reset on blur': function(client) {
    client
      .setValue(placeholders.text.sel, 'test')
      .click('body')
      .getText(placeholders.text.sel, function(result) {
        this.assert.equal(result.value, placeholders.text.value,
          'placeholder is again "' + placeholders.text.value + '"');
      })
      .end();
  }
};
