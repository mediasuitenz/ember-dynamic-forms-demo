import Ember from 'ember'
const { get } = Ember

export function getSubstate ([state, formElement, index]) {
  const wholeComponentState = get(state, formElement.name)
  return wholeComponentState.objectAt(index)
}

export default Ember.Helper.helper(getSubstate)
