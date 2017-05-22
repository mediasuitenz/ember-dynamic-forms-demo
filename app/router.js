import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {path: '/'})
  this.route('dynamic-form', {path: '/general'})

  this.route('applicant-details')
  this.route('property-details')
});

export default Router;
