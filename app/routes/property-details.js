import Ember from 'ember'
import form from 'ember-dynamic-forms-demo/temp-fixtures/property-details'

export default Ember.Route.extend({
  templateName: 'dynamic-form',
  model () {
    return form
  },
});
