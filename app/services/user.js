import Ember from 'ember';

export default Ember.Service.extend({
  getUserDetails () {
    return {
      firstName: 'Brian',
      surname: 'Clough',
      mobPhone: '02897358943759',
      bio: 'Brian won two European Cups with Nottingham Forest in the 78/79 and 79/90 seasons.'
    }
  }
});
