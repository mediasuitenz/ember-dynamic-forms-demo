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

  actions: {
    updateState (formElement, value, index) {
      const state = copy(get(this, 'form.state'), true)

      if (state[formElement.name]) {
        state[formElement.name][index] = value
      } else {
        // The formElement is not in the state, so we need to add it
        state[formElement.name] = [value]
      }
      set(this, 'form.state', state)
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
