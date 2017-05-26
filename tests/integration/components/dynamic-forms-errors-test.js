import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
// import wait from 'ember-test-helpers/wait';

moduleForComponent('dynamic-form', 'Integration | Component | Dynamic Form Delete', {
  integration: true
});

const errorMessage = 'This is a test error'
const errorElement = {
  formElements: [{
    type: 'text',
    name: 'testElement'
  }],
  state: {
    testElement: [
      {
        val: 'test one',
        errors: [{
          message: errorMessage
        }]
      },
    ]
  }
}

const formErrors = {
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
    ],
    errors: [{
      message: errorMessage,
    }, {
      message: 'Another error'
    }]
  }
}

test('Displays an element error', function (assert) {
  this.set('form', errorElement)
  this.render(hbs`{{dynamic-form form=form}}`)
  assert.equal(this.$(`.error:contains("${errorMessage}")`).length, 1)
})

test('Displays a whole form error', function (assert) {
  this.set('form', formErrors)
  this.render(hbs`{{dynamic-form form=form}}`)
  assert.equal(this.$(`.error`).length, 2)
  assert.equal(this.$(`.error:contains("${errorMessage}")`).length, 1)
})


