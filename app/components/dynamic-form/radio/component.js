import Ember from 'ember'
import DynamicElement from 'ember-dynamic-forms-demo/mixins/components/dynamic-formElement'
const { get, set } = Ember

export default Ember.Component.extend(DynamicElement, {
  // select and radio formElements will throw an error if you keep the value updated with a computed property due
  // to a double render.  The control represents the new value, without the 'value' being kept in sync, so can
  // get away with just setting on init

  conditionalSetValues () {
    if (get(this, 'state') == null || get(this, `state.${get(this, 'formElement.name')}`) == null){
      return set(this, 'values', [])
    }

    const componentState = get(this, `state.${get(this, 'formElement.name')}`) || [];
    set(this, 'values', componentState.map(valueItem => {
      return get(this, 'formElement.options').find(option => option.value === valueItem.val)
    }))
  },

  actions: {
    updateState (index, selectedItem) {
      // Need a custom updateState to pick the value off the selectedItem
      get(this, 'updateState')(get(this, 'formElement'), selectedItem.value, index)
    }
  }
})
