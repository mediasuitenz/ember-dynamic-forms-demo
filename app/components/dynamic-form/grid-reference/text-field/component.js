import Ember from 'ember'
import DynamicComponent from 'ember-dynamic-forms-demo/mixins/components/dynamic-component'
const { get, set } = Ember

export default Ember.Component.extend(DynamicComponent, {
  value: null,
  init () {
    this._super(...arguments)
    this.conditionalSetValues()
  },

  conditionalSetValues () {
    const componentName = get(this, 'component.name')
    const eastingNorthing = get(this, `state.${componentName}`).objectAt(get(this, 'index'))
    const isEasting = get(this, 'isEasting')

    // If no default or no value, the code that sets default state will assume this element has a scalar value and
    // default the value to `null`.  Therefore, need to step in and provide proper component specific defaults
    // or the code will crash when trying to access element `0` or `1` of `null`
    if (Array.isArray(eastingNorthing)) {
      set(this, 'value', isEasting ? eastingNorthing[0] : eastingNorthing[1])
    } else {
      set(this, 'value', '')
    }
  },

  actions: {
    updateState (index, value) {
      const componentName = get(this, 'component.name')
      let eastingNorthing = get(this, `state.${componentName}`).objectAt(get(this, 'index'))
      const isEasting = get(this, 'isEasting')

      eastingNorthing = isEasting ? [value, eastingNorthing[1]] : [eastingNorthing[0], value]
      get(this, 'updateState')(get(this, 'component'), eastingNorthing, index)
    }
  }
})

