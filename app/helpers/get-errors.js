import Ember from 'ember'
const { get } = Ember

export function getErrors ([state, formElement, index]) {
  const wholeComponentState = get(state, formElement.name)
  return wholeComponentState.objectAt(index).errors || []
}

export default Ember.Helper.helper(getErrors)
