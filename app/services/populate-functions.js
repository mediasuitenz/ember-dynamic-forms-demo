import Ember from 'ember';
const {inject, get, RSVP, copy} = Ember
import reduce from 'npm:async/reduce'
import eachOf from 'npm:async/eachOf'

export default Ember.Service.extend({
  defaultFunctions: inject.service(),

  buildState (initialState, formElements, formElementCount) {
    initialState = copy(initialState) || {}
    formElementCount = formElementCount || 1
    return new RSVP.Promise((resolve) => {
      // Loop through each formElement and make sure we have state
      reduce(formElements, {}, (tempState, formElement, callback) => {
        // If the formElement doesn't have a name, then it is an information formElement and does not need state
        if (!formElement.name) return callback(null, tempState)

        if (!formElement.formElements) {
          // Populate by a population function if it exists, and the state is not already set
          if (get(formElement, 'default.func') && !initialState[formElement.name]) {
            this.processFromDefaultFunction(initialState, formElement, formElementCount, tempState, callback)
          } else {
            tempState[formElement.name] = this.getState(initialState, formElement)
            callback(null, tempState)
          }
        } else {
          this.processSection(initialState, formElement, formElementCount, tempState, callback)
        }
      }, function (err, result) {
        resolve(Object.assign({}, initialState, result))
      })
    })
  },

  getState(initialState, formElement) {
    return initialState[formElement.name] || [{val: get(formElement, 'default.val')}] || [{ val: null }]
  },

  processFromDefaultFunction(initialState, formElement, formElementCount, tempState, callback) {
    // Need to determine if this is the correct time to call the default function
    const runOnFirstOnlyAndIsFirst = formElement.default.execute === 'first-only' && formElementCount === 1
    const runAlways = formElement.default.execute == null || formElement.default.execute === 'all'

    if (runOnFirstOnlyAndIsFirst || runAlways) {
      get(this, 'defaultFunctions')[get(formElement, 'default.func')](formElement.default.arguments)
        .then(value => {
          tempState[formElement.name] = [{val: value}]
          callback(null, tempState)
        })
    } else {
      // todo: consider tidying this code as is duplicated above
      tempState[formElement.name] = this.getState(initialState, formElement)
      callback(null, tempState)
    }
  },

  processSection(initialState, formElement, formElementCount, tempState, callback) {
    // Holy Recursing, Batman!
    // This is complicated.  The initialState[formElement] returns an array of objects, or nothing
    // [{val: dfdf, errors:..dsfsd, hidden:sdfsdf}, {val:dfsdfs}]
    // Therefore, need to loop this properly as well to process each 'state' from the array

    if (!initialState[formElement.name]) {
      // There is no initial state, there just build it from null
      return this.buildState(null, formElement.formElements, formElementCount)
        .then(state => {
          tempState[formElement.name] = [{val: state}]
          callback(null, tempState)
        })
    }
    // Else, we have existing state, that we want to append to, potentially
    tempState[formElement.name] = [];
    eachOf(initialState[formElement.name], (subState, index, next) => {
      this.buildState(subState.val, formElement.formElements, formElementCount)
        .then(state => {
          tempState[formElement.name][index] = Object.assign({}, subState, {val: state})
          next()
        })
    }, () => {
      callback(null, tempState)
    })
  }
});
