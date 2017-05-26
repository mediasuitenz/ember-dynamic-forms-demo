import Ember from 'ember'
const { computed, get, set, observer } = Ember

export default Ember.Mixin.create({
  // Some useful values
  values: [],
  currentDisplay: true,
  formElementState: computed('state', 'formElement', function () {
    const formElementName = get(this, 'formElement.name')
    return get(this, `state.${formElementName}`) || [];
  }),
  stateToDisplay: computed.filter('formElementState', (item) => !get(item, 'deleted') && !get(item, 'hidden') ),
  totalNumber: computed.alias('formElementState.length'),
  totalNumberDisplayed: computed.alias('stateToDisplay.length'),
  showDeleteButton: computed.gt('totalNumberDisplayed', 1),
  stateValue: computed('formElementState','index', function () {
    return get(this, 'formElementState').objectAt(get(this, 'index')).val
  }),

  isDeletedOrHidden: computed('formElementState', 'index', function () {
    const index = get(this, 'index')
    if (index == null) return false

    const state = get(this, 'formElementState').objectAt(get(this, 'index'))
    return (state.hidden || state.deleted)
  }),

  display: computed('state', 'formElement.{name,conditions}', function () {
    const conditions = get(this, 'formElement.conditions')
    const state = get(this, 'state')
    if (!conditions || conditions.length === 0) return true

    // todo: move to lodash at some point
    const keys = Object.keys(state)
    const display = conditions.every(condition => {
      const target = keys.find(key => key === condition.name)
      // The target condition is not yet in the state.  Because of the progress way the state is built, this is
      // legitimate, but we don't want an error thrown
      if (!target) return false;

      // Purposeful non-strict compare so we don't fall foul of "string or number" type issues
      // Also, note that we only use the first formElement.  Not sure yet how we would handle a condition with repeated formElements
      return (state[target][0]['val'] == condition.value) // eslint-disable-line eqeqeq
    })

    // All elements are hidden or shown based on the conditions, not just individual items from
    // the array
    if (get(this, 'currentDisplay') !== display) {
      get(this, 'formElementState').forEach(element => element.hidden = !display)
    }
    set(this, 'currentDisplay', display)
    return display
  }),

  // Text formElements need the value to be updated as you type in order to update
  valuesObserver: observer('state', 'formElement.name', function () {
    this.conditionalSetValues()
  }),

  init () {
    this._super()
    this.conditionalSetValues()
  },

  conditionalSetValues () {
    if (get(this, 'formElementState.length') !== get(this, 'values.length')) {
      set(this, 'values', get(this, 'formElementState'))
    }
  },

  actions: {
    updateState (index, value) {
      get(this, 'updateState')(get(this, 'formElement'), value, index)
    },
    add () {
      get(this, 'updateState')(get(this, 'formElement'), null, get(this, 'totalNumber'))
    }
  }
})
