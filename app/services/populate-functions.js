import Ember from 'ember';
const {inject, get, RSVP} = Ember
import reduce from 'npm:async/reduce'

export default Ember.Service.extend({
  user: inject.service(),
  populateFunctions: inject.service(),

  buildState (initialState, formElements, formElementCount) {
    initialState = initialState || {}
    formElementCount = formElementCount || 1
    return new RSVP.Promise((resolve) => {
      // Loop through each formElement and make sure we have state
      reduce(formElements, {}, (tempState, formElement, callback) => {
        // If the formElement doesn't have a name, then it is an information formElement and does not need state
        if (!formElement.name) return callback(null, tempState)

        if (!formElement.formElements) {
          // Populate by a population function if it exists, and the state is not already set
          if (get(formElement, 'default.func') && !initialState[formElement.name]) {
            // Need to determine if this is the correct time to call the default function
            const runOnFirstOnlyAndIsFirst = formElement.default.execute === 'first-only' && formElementCount === 1
            const runAlways = formElement.default.execute == null || formElement.default.execute === 'all'

            if (runOnFirstOnlyAndIsFirst || runAlways) {
              get(this, 'populateFunctions')[get(formElement, 'default.func')](formElement.default.arguments)
                .then(value => {
                  tempState[formElement.name] = [{val: value}]
                  callback(null, tempState)
                })
            } else {
              // todo: oh my, tidy this code up
              tempState[formElement.name] = initialState[formElement.name] || [{val: get(formElement, 'default.val')}] || [{ val: null }]
              callback(null, tempState)
            }
          } else {
            tempState[formElement.name] = initialState[formElement.name] || [{val: get(formElement, 'default.val')}] || [{ val: null }]
            callback(null, tempState)
          }
        } else {
          // Holy Recursing, Batman!
          this.buildState(initialState[formElement.name], formElement.formElements, formElementCount)
            .then(state => {
              tempState[formElement.name] = [{val: state}]
              callback(null, tempState)
            })
        }
        return tempState
      }, function (err, result) {
        resolve(result)
      })
    })
  },

  // Add populating functions here
  // Note: all populating functions must return a common promise interface

  getFirstName () {
    return RSVP.Promise.resolve(get(this, 'user').getUserDetails().firstName)
  },

  getLastName () {
    return RSVP.Promise.resolve(get(this, 'user').getUserDetails().surname)
  }
});
