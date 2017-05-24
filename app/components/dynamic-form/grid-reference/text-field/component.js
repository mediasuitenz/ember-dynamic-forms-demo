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
    const eastingNorthing = get(this, `state.${formElementName}`).objectAt(get(this, 'index')).val
    const isEasting = get(this, 'isEasting')

    // If no default or no value, the code that sets default state will assume this formElement has a scalar value and
    // default the value to `null`.  Therefore, need to step in and provide proper formElement specific defaults
    // or the code will crash when trying to access formElement `0` or `1` of `null`
    if (Array.isArray(eastingNorthing)) {
      set(this, 'value', isEasting ? eastingNorthing[0] : eastingNorthing[1])
    } else {
      set(this, 'value', '')
    }
  },

  actions: {
    updateState (index, value) {
      const formElementName = get(this, 'formElement.name')
      let eastingNorthing = get(this, `state.${formElementName}`).objectAt(get(this, 'index')).val
      const isEasting = get(this, 'isEasting')

      eastingNorthing = isEasting ? [value, eastingNorthing[1]] : [eastingNorthing[0], value]
      get(this, 'updateState')(get(this, 'formElement'), eastingNorthing, index)
    }
  }
})

