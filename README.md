# Ember Formerly

This repo represents a detailed investigation into building dynamic forms using Ember.js.

## Overview
* Each form is represented by a configuration object that describes the elements it is to draw, and the current state
of the application.

## Element Rules
* Each element has it's own Ember Component.  Each Component knows how to draw the element, including applying any
repeat functionality, conditional display logic and determining defaults
* Each component must update the form state by calling `updateState` closure action.
* Each component must manage this update and redraw without breaking the Ember run loop (more difficult that it sounds)

## Next Tasks
* Switch 'component' to 'element' within the config and code to avoid confusion with Ember Components
* How we update existing elements (e.g. include IDs on the State)
* Clean up the state before Save to ensure that any values that are no longer valid (e.g. the element in which data was
entered has subsequently been hidden, and so the data needs deleting before sending to the server)
* Display server validation errors back on to the client
* Side-bar text (e.g. https://wireframepro.mockflow.com/view/Resource_Consent_Application#/page/D9541d0dbdbab515b00f4dadbb93131b6
"Describe the site, including:" section)


