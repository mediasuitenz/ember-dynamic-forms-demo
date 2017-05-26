import Ember from 'ember';
const { get, RSVP, inject} = Ember

export default Ember.Service.extend({
  user: inject.service(),
  // Add populating functions here
  // Note: all populating functions must return a common promise interface

  getFirstName () {
    return RSVP.Promise.resolve(get(this, 'user').getUserDetails().firstName)
  },

  getLastName () {
    return RSVP.Promise.resolve(get(this, 'user').getUserDetails().surname)
  }
})
