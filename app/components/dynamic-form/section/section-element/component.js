import Ember from 'ember'
import DynamicElement from 'ember-dynamic-forms-demo/mixins/components/dynamic-formElement'
import { getSubstate } from 'ember-dynamic-forms-demo/helpers/get-substate'
const { get, set, computed } = Ember

export default Ember.Component.extend(DynamicElement, {
  value: null,

  conditionalSetValues () {
    // const formElementName = get(this, 'formElement.name')
    // const componentState = get(this, `state.${formElementName}`) || [];
    const newVal = get(this, 'formElementState').objectAt(get(this, 'index'))
    set(this, 'value', newVal)
  },

  subState: computed('state', 'index', 'formElement', function () {
    return getSubstate([get(this, 'state'), get(this, 'formElement'), get(this, 'index')])
  })
})

