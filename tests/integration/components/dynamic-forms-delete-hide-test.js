import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('dynamic-form', 'Integration | Component | Dynamic Form Delete', {
  integration: true
});

const deleteForm = {
  formElements: [{
    type: 'text',
    repeatable: true,
    name: 'testElement'
  }],
  state: {
    testElement: [
      { val: 'test one' },
      { val: 'test two' }
    ]
  }
}

const hideForm = {
  formElements: [{
    type: 'radio',
    name: 'testRadio',
    options: [
      { 'value': 1, 'label': 'On' },
      { 'value': 2, 'label': 'Off' }
    ]
  }, {
    type: 'text',
    name: 'testText',
    conditions: [{'name': 'testRadio', value: 1}]
  }],
  state: {
    'testRadio': [
      {val: 1}
    ]
  }
}

test('Can delete an added formElement', function (assert) {
  this.set('form', deleteForm)
  this.render(hbs`{{dynamic-form form=form}}`)

  assert.notOk(deleteForm.state.testElement[1].deleted)
  assert.equal(this.$('.delete').length, 2)

  this.$('.delete:eq(1)').trigger('click').change()

  wait().then(() => {
    assert.ok(deleteForm.state.testElement[1].deleted)
    // All delete buttons removed as can't delete last item
    assert.equal(this.$('.delete').length, 0)
  })
})

test('Hidden elements are marked as such in the state', function (assert) {
  this.set('form', hideForm)
  this.render(hbs`{{dynamic-form form=form}}`)

  assert.equal(this.$('input[type="text"]').length, 1)

  this.$('input[type="radio"]:eq(1)').trigger('click').change()

  wait().then(() => {
    assert.ok(hideForm.state.testText[0].hidden)
    assert.equal(this.$('input[type="text"]').length, 0)
  })
})


