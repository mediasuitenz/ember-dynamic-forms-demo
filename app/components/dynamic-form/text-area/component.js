import Ember from 'ember'
const { get, set } = Ember
import DynamicComponent from 'ember-dynamic-forms-demo/mixins/components/dynamic-component'

export default Ember.Component.extend(DynamicComponent, {

  conditionalSetValues () {
    const componentName = get(this, 'component.name')
    const stateItem = get(this, `state.${componentName}`)

    if (!stateItem || stateItem.length !== get(this, 'values.length')) {
      set(this, 'values', stateItem)
    }
  }

})
