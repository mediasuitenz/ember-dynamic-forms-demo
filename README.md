# Ember Formerly

This repo represents a detailed investigation into building dynamic forms using Ember.js.

## Overview
* Each form is represented by a configuration object that describes the formElements it is to draw, and the current state
of the application.

## Element Rules
* Each formElement has it's own Ember Component.  Each Component knows how to draw the formElement, including applying any
repeat functionality, conditional display logic and determining defaults
* Each component must update the form state by calling `updateState` closure action.
* Each component must manage this update and redraw without breaking the Ember run loop (more difficult that it sounds)

## Next Tasks
* Clean up the state before Save to ensure that any values that are no longer valid (e.g. the formElement in which data was
entered has subsequently been hidden, and so the data needs deleting before sending to the server)
* Display server validation errors back on to the client
* Side-bar text (e.g. https://wireframepro.mockflow.com/view/Resource_Consent_Application#/page/D9541d0dbdbab515b00f4dadbb93131b6
"Describe the site, including:" section)
* Don't pass a condition if the value is in a deleted state
* Make formElements deletable (suspect we need, but not seen on the mocks yet)
* Currently only new/removed elements cause certain elements to re-evaluate their value from the original `state`, instead
preferring to keep their current value managed locally.  This has been to stop cascading renders.  However, I suspect at some
point this will prove a problem, and we'll need to be able to modify all fields from simply updating state (e.g. press a button
that populates existing elements)
* Think things may break if we add and remove nested inside a section - need to check


