import Ember from 'ember'
import DynamicElement from 'ember-dynamic-forms-demo/mixins/components/dynamic-formElement'
const { get, set } = Ember

export default Ember.Component.extend(DynamicElement, {
  value: null,

  conditionalSetValues () {
    set(this, 'value', get(this, 'formElement.options').find(option => option.value === get(this, 'stateValue')))
  },

  actions: {
    updateState (selectedItem) {
      // Need a custom updateState to pick the value off the selectedItem
      get(this, 'updateState')(get(this, 'formElement'), selectedItem.value, get(this, 'index'))
    }
  }
})

