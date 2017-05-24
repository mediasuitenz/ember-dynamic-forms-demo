import Ember from 'ember'
import DynamicElement from 'ember-dynamic-forms-demo/mixins/components/dynamic-formElement'
// import { buildStateAsync } from 'ember-dynamic-forms-demo/utils/dynamic-forms-utils'
const { get, set, inject, copy } = Ember

export default Ember.Component.extend(DynamicElement, {
  populateFunctions: inject.service(),

  updateDeletedHide(sectionIndex, formElement, index, key, status = true) {
    // We take a copy here so that the state reference changes on set and forces observers throughout the app fire
    const state = get(this, 'state')
    state[formElement.name][index] = Object.assign({}, state[formElement.name][index], { [key]: status })
    set(this, 'state', state)

    get(this, 'updateState')(get(this, 'formElement'), state, sectionIndex)
  },

  actions: {
    updateState (sectionIndex, formElement, value, index) {
      // Update the 'value' for this formElement.
      const sectionComponentName = get(this, 'formElement.name')
      const state = copy(get(this, `state.${sectionComponentName}`).objectAt(sectionIndex).val, true)

      if (state[formElement.name]) {
        state[formElement.name][index] = Object.assign({}, state[formElement.name][index], { val: value })
      } else {
        // The formElement is not in the state, so we need to add it
        state[formElement.name] = [{val: value}]
      }

      // Now send this whole updated value up a level so it can be updated their
      get(this, 'updateState')(get(this, 'formElement'), state, sectionIndex)
    },

    add () {
      const existingCount = get(this, `state.${get(this, 'formElement.name')}.length`)
      get(this, 'populateFunctions').buildState({}, get(this, 'formElement.formElements'), existingCount + 1)
        .then(state => {
          get(this, 'updateState')(get(this, 'formElement'), state, get(this, 'values.length'))
        })
    },

    delete (sectionIndex, formElement, index) {
      this.updateDeletedHide(sectionIndex, formElement, index, 'deleted')
    }
  }


})
