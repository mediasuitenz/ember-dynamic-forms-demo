import Ember from 'ember';
const {inject, get, RSVP} = Ember
import reduce from 'npm:async/reduce'

export default Ember.Service.extend({
  user: inject.service(),
  populateFunctions: inject.service(),

  buildState (initialState, components, elementCount) {
    initialState = initialState || {}
    elementCount = elementCount || 1
    return new RSVP.Promise((resolve) => {
      // Loop through each component and make sure we have state
      reduce(components, {}, (tempState, component, callback) => {
        // If the element doesn't have a name, then it is an information element and does not need state
        if (!component.name) return callback(null, tempState)

        if (!component.components) {
          // Populate by a population function if it exists, and the state is not already set
          if (get(component, 'default.func') && !initialState[component.name]) {
            // Need to determine if this is the correct time to call the default function
            const runOnFirstOnlyAndIsFirst = component.default.execute === 'first-only' && elementCount === 1
            const runAlways = component.default.execute == null || component.default.execute === 'all'

            if (runOnFirstOnlyAndIsFirst || runAlways) {
              get(this, 'populateFunctions')[get(component, 'default.func')](component.default.arguments)
                .then(value => {
                  tempState[component.name] = value
                  callback(null, tempState)
                })
            } else {
              // todo: oh my, tidy this code up
              tempState[component.name] = initialState[component.name] || get(component, 'default.val') || [null]
              callback(null, tempState)
            }
          } else {
            tempState[component.name] = initialState[component.name] || get(component, 'default.val') || [null]
            callback(null, tempState)
          }
        } else {
          // Holy Recursing, Batman!
          this.buildState(initialState[component.name], component.components, elementCount)
            .then(state => {
              tempState[component.name] = [state]
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
  // Note: all populating functions must return a common promise interface, with a value in an array

  getFirstName () {
    return RSVP.Promise.resolve([get(this, 'user').getUserDetails().firstName])
  },

  getLastName () {
    return RSVP.Promise.resolve([get(this, 'user').getUserDetails().surname])
  }
});
