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

test('it renders a basic form with a basic information element', function(assert) {
  const form = {
    components: [{
      type: 'information',
      markup: '<h2>Example title</h2>'
    }]

  }
  this.set('form', form)
  this.render(hbs`{{dynamic-form form=form}}`);
  assert.ok(this.$().html().includes('<h2>Example title</h2>'));
});

test('it renders a basic form with single level components', function(assert) {
  this.set('form', basicForm)
  this.render(hbs`{{dynamic-form form=form}}`);
  assert.ok(this.$().html().includes('Which area is affected'));
});

test('it can show a conditional element', function(assert) {
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

test('it can repeat a repeatable element', function(assert) {
  this.set('form', nestedComponents)
  this.render(hbs`{{dynamic-form form=form}}`);
  assert.equal(this.$('span:contains("Which area is affected?")').length, 1)
  this.$('button:eq(1)').click()
  assert.equal(this.$('span:contains("Which area is affected?")').length, 2)
});

skip('Loads default values from a function', function(assert) {
  this.set('form', applicantDetails)
  this.render(hbs`{{dynamic-form form=form}}`);
  // This current fails.
  // Renders initial state provided while calculating the missing state, but hasn't yet rendered the contact details
  // panels.
  wait().then(() => assert.equal(this.$('label:contains("First name(s)")').next('input').text(), 'Brian', 'Default text loaded from function'))

  // todo: see if we can get this test working in the future
})

skip('it removes any not needed values on save')
