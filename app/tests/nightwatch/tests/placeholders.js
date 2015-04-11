module.exports = {
  'element should have placeholder text': function(client) {
    var text = client.globals.placeholders.text;
    client.init()
      .waitForElementVisible("body", 1000)
      .assert.attributeEquals(text.sel,
          'data-placeholder', text.value)
      .getText(text.sel, function(result) {
        this.assert.equal(result.value, text.value,
          'placeholder is "' + text.value + '"');
      })
  },

  'placeholder should clear on focus': function(client) {
    var text = client.globals.placeholders.text;
    client
      .click(text.sel)
      .getText(text.sel, function(result) {
        this.assert.equal(result.value, '', 'placeholder is blank');
      })
  },

  'placeholder should reset on blur': function(client) {
    var text = client.globals.placeholders.text;
    client
      .setValue(text.sel, 'test')
      .click('body')
      .getText(text.sel, function(result) {
        this.assert.equal(result.value, text.value,
          'placeholder is again "' + text.value + '"');
      })
      .end();
  }
};
