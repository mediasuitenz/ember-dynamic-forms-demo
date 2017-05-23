import Ember from 'ember'
import DynamicElement from 'ember-dynamic-forms-demo/mixins/components/dynamic-formElement'
const { get, set } = Ember

export default Ember.Component.extend(DynamicElement, {
  value: null,
  init () {
    this._super(...arguments)
    this.conditionalSetValues()
  },

  conditionalSetValues () {
    const formElementName = get(this, 'formElement.name')
    const newVal = get(this, `state.${formElementName}`).objectAt(get(this, 'index'))
    set(this, 'value', newVal)
  },

  actions: {
    updateState (index, value) {
      get(this, 'updateState')(get(this, 'formElement'), value, index)
    }
  }
})

