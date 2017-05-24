import { moduleForComponent, test, skip } from 'ember-qunit';
// import Ember from 'ember'
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

import basicForm from 'ember-dynamic-forms-demo/temp-fixtures/basic-form'
import singleLevelConditionals from 'ember-dynamic-forms-demo/temp-fixtures/single-level-conditionals'
import nestedComponents from 'ember-dynamic-forms-demo/temp-fixtures/nested-components'
import applicantDetails from 'ember-dynamic-forms-demo/temp-fixtures/applicant-details'

moduleForComponent('dynamic-form', 'Integration | Component | Dynamic Form', {
  integration: true
});

test('it renders a basic form with a basic information formElement', function(assert) {
  const form = {
    formElements: [{
      type: 'information',
      markup: '<h2>Example title</h2>'
    }]

  }
  this.set('form', form)
  this.render(hbs`{{dynamic-form form=form}}`);
  assert.ok(this.$().html().includes('<h2>Example title</h2>'));
});

test('it renders a basic form with single level formElements', function(assert) {
  this.set('form', basicForm)
  this.render(hbs`{{dynamic-form form=form}}`);
  assert.ok(this.$().html().includes('Which area is affected'));
});

test('it can show a conditional formElement', function(assert) {
  this.set('form', singleLevelConditionals)
  this.render(hbs`{{dynamic-form form=form}}`);
  assert.notOk(this.$().html().includes('Reference number'), '"Reference number" text is present when it should not be')
  this.$('.radio-button:eq(2) input').trigger('click').change()
  wait().then(() => assert.ok(this.$().html().includes('Reference number'), '"Reference number" text is not present when it should be'))

  // wait().then(() => wait().then(() => assert.ok(this.$().html().includes('Reference number'), '"Reference number" text is not present when it should be')))
  // Ember.run.later(this, ()=>{
  //   // Introduce a delay to let the application catch up.
  //   // Surprised this doesn't work with simply the 'wait()' but something must be happening outside the ember run loop
  //   // - or spanning a couple of them
  // }, 1000)
  // wait().then(() => assert.ok(this.$().html().includes('Reference number'), '"Reference number" text is not present when it should be'))

});

test('it can repeat a repeatable formElement', function(assert) {
  this.set('form', nestedComponents)
  this.render(hbs`{{dynamic-form form=form}}`)
  assert.equal(this.$('span:contains("Which area is affected?")').length, 1)
  this.$('button:eq(1)').click()
  assert.equal(this.$('span:contains("Which area is affected?")').length, 2)
});

// todo: see if we can get this test working in the future
skip('Loads default values from a function', function(assert) {
  this.set('form', applicantDetails)
  this.render(hbs`{{dynamic-form form=form}}`);
  // This current fails.
  // Renders initial state provided while calculating the missing state, but hasn't yet rendered the contact details
  // panels.
  wait().then(() => assert.equal(this.$('label:contains("First name(s)")').next('input').text(), 'Brian', 'Default text loaded from function'))

})

test('Ids are retained if the value is updated', function(assert) {
  this.set('form', basicForm)
  this.render(hbs`{{dynamic-form form=form}}`)
  this.$('select:eq(0)').val('1').change()
  wait().then(() => {
    assert.equal(basicForm.state.targetOrg[0].val, 1)
    assert.equal(basicForm.state.targetOrg[0].id, 1234)
  })
})

skip('it removes any not needed values on save')
