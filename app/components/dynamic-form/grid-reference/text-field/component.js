import Ember from 'ember'
import DynamicElement from 'ember-dynamic-forms-demo/mixins/components/dynamic-formElement'
const { get, set } = Ember

export default Ember.Component.extend(DynamicElement, {
  value: null,

  conditionalSetValues () {
    const isEasting = get(this, 'isEasting')

    // If no default or no value, the code that sets default state will assume this formElement has a scalar value and
    // default the value to `null`.  Therefore, need to step in and provide proper formElement specific defaults
    // or the code will crash when trying to access formElement `0` or `1` of `null`
    if (Array.isArray(get(this, 'stateValue'))) {
      set(this, 'value', isEasting ? get(this, 'stateValue')[0] : get(this, 'stateValue')[1])
    } else {
      set(this, 'value', '')
    }
  },

  actions: {
    updateState (index, value) {
      const isEasting = get(this, 'isEasting')
      const easting = isEasting ? value : (get(this, 'stateValue') ? get(this, 'stateValue')[0] : '')
      const northing = !isEasting ? value : (get(this, 'stateValue') ? get(this, 'stateValue')[1] : '')

      get(this, 'updateState')(get(this, 'formElement'), [easting, northing], index)
    }
  }
})

