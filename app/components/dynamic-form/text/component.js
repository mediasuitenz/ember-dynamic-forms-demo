import Ember from 'ember'
const { get, set } = Ember
import DynamicElement from 'ember-dynamic-forms-demo/mixins/components/dynamic-formElement'

export default Ember.Component.extend(DynamicElement, {

  conditionalSetValues () {
    const formElementName = get(this, 'formElement.name')
    const stateItem = get(this, `state.${formElementName}`)

    if (!stateItem || stateItem.length !== get(this, 'values.length')) {
      set(this, 'values', stateItem)
    }
  }

})

