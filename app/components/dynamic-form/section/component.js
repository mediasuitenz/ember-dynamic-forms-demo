import Ember from 'ember'
import DynamicComponent from 'ember-dynamic-forms-demo/mixins/components/dynamic-component'
// import { buildStateAsync } from 'ember-dynamic-forms-demo/utils/dynamic-forms-utils'
const { get, set, copy, inject } = Ember

export default Ember.Component.extend(DynamicComponent, {
  populateFunctions: inject.service(),

  conditionalSetValues () {
    // Note, for sections, the values are not used as anything other than an array to help render the right amount of
    // components
    const componentName = get(this, 'component.name')
    const stateItem = get(this, `state.${componentName}`)

    if (!stateItem || stateItem.length !== get(this, 'values.length')) {
      set(this, 'values', stateItem)
    }
  },

  actions: {
    updateState (sectionIndex, component, value, index) {
      // Update the 'value' for this component.
      const sectionComponentName = get(this, 'component.name')
      const state = copy(get(this, `state.${sectionComponentName}`).objectAt(sectionIndex), true)

      if (state[component.name]) {
        state[component.name][index] = value
      } else {
        // The element is not in the state, so we need to add it
        state[component.name] = [value]
      }

      // Now send this whole updated value up a level so it can be updated their
      get(this, 'updateState')(get(this, 'component'), state, sectionIndex)
    },

    add () {
      const existingCount = get(this, `state.${get(this, 'component.name')}.length`)
      get(this, 'populateFunctions').buildState({}, get(this, 'component.components'), existingCount + 1)
        .then(state => {
          get(this, 'updateState')(get(this, 'component'), state, get(this, 'values.length'))
        })
    }
  }
})