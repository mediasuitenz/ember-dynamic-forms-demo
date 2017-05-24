import Ember from 'ember'
const { set, get, copy, inject } = Ember

export default Ember.Component.extend({
  populateFunctions: inject.service(),

  // Want to populate the initial state with any missing items.  Might not be necessary if the server does this for us,
  // but no bad thing to have
  didReceiveAttrs () {
    get(this, 'populateFunctions').buildState(get(this, 'form.state'), get(this, 'form.formElements'))
      .then(state => {
        set(this, 'form.state', state)
      })
  },

  updateDeletedHide(formElement, index, key, status = true) {
    // We take a copy here so that the state reference changes on set and forces observers throughout the app fire
    const state = copy(get(this, 'form.state'), true)
    state[formElement.name][index] = Object.assign({}, state[formElement.name][index], { [key]: status })
    set(this, 'form.state', state)

  },

  actions: {
    updateState (formElement, value, index) {
      // We take a copy here so that the state reference changes on set and forces observers throughout the app fire
      const state = copy(get(this, 'form.state'), true)

      if (state[formElement.name]) {
        // Update the current value object if there was one, preserving any other information in the object
        state[formElement.name][index] = Object.assign({}, state[formElement.name][index], { val: value })
      } else {
        // The formElement is not in the state, so we need to add it
        state[formElement.name] = [{val: value}]
      }
      set(this, 'form.state', state)
    },

    delete (formElement, index) {
      this.updateDeletedHide(formElement, index, 'deleted')
    },

    hide (formElement, index) {
      this.updateDeletedHide(formElement, index, 'hidden')
    },

    show (formElement, index) {
      this.updateDeletedHide(formElement, index, 'hidden', false)
    }
  },

  save () {
    // todo: need to clear up any invalid state that has been accumulated over the form entry before sending back to
    // the server
  }
})

/**
 * Text areas may need to include a unit (e.g. meters) after the input
 * Conditionally required
 */

