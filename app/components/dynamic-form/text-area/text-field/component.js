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
    const newVal = get(this, `state.${componentName}`).objectAt(get(this, 'index'))
    set(this, 'value', newVal)
  },

  actions: {
    updateState (index, value) {
      get(this, 'updateState')(get(this, 'component'), value, index)
    }
  }
})

