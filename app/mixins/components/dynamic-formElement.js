import Ember from 'ember'

const { computed, get, observer } = Ember

export default Ember.Mixin.create({
  values: [],

  init () {
    this._super()
    this.conditionalSetValues()
  },

  display: computed('state', 'formElement.{name,conditions}', function () {
    const conditions = get(this, 'formElement.conditions')
    const state = get(this, 'state')
    if (!conditions || conditions.length === 0) return true

    // todo: move to lodash at some point
    const keys = Object.keys(state)
    return conditions.every(condition => {
      const target = keys.find(key => key === condition.name)

      // The target condition is not yet in the state.  Because of the progress way the state is built, this is
      // legitimate, but we don't want an error thrown
      if (!target) return false;

      // Purposeful non-strict compare so we don't fall foul of "string or number" type issues
      // Also, note that we only use the first formElement.  Not sure yet how we would handle a condition with repeated formElements
      return (state[target][0]['val'] == condition.value) // eslint-disable-line eqeqeq
    })
  }),

  // Text formElements need the value to be updated as you type in order to update
  valuesObserver: observer('state', 'formElement.name', function () {
    this.conditionalSetValues()
  }),

  actions: {
    updateState (index, selectedItem) {
      // Need a custom updateState to pick the value off the selectedItem
      get(this, 'updateState')(get(this, 'formElement'), selectedItem.value, index)
    },
    add () {
      get(this, 'updateState')(get(this, 'formElement'), null, get(this, 'values.length'))
    }
  }
})
