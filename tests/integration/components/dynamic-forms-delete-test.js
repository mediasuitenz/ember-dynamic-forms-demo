import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('dynamic-form', 'Integration | Component | Dynamic Form Delete', {
  integration: true
});



const form = {
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

test('Can delete an added formElement', function (assert) {
  this.set('form', form)
  this.render(hbs`{{dynamic-form form=form}}`)

  assert.notOk(form.state.testElement[1].deleted)
  assert.equal(this.$('.delete').length, 2)

  this.$('.delete:eq(1)').trigger('click').change()

  wait().then(() => {
    assert.ok(form.state.testElement[1].deleted)
    // All delete buttons removed as can't delete last item
    assert.equal(this.$('.delete').length, 0)
  })

})


