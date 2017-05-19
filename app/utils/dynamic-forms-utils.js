// exports.findState = function findState (state, componentName, instance) {
//   return state.find(item => {
//     if (instance != null) {
//       return item.name === componentName
//     } else {
//       return item.name === componentName && item.instance === instance
//     }
//   })
// }

// exports.getRepeatableComponents = function getRepeatableComponents (state, component) {
//   const stateItem = state.find(item => item.name === component.name)
//
//   if (!stateItem) return []
//
//   // Need a fresh 'component', so setting 'rendingAdd' on one does not affect all instances
//   return stateItem.value.map(() => JSON.parse(JSON.stringify(component)))
// }

const buildState = function buildState (initialState, components) {
  initialState = initialState || {}

  // Loop through each component and make sure we have state
  const state = components.reduce((tempState, component) => {
    if (!component.components) {
      tempState[component.name] = initialState[component.name] || [component.default] || [null]
    } else {
      // Holy Recursing, Batman!
      tempState[component.name] = [buildState(initialState[component.name], component.components)]
    }
    return tempState
  }, {})

  return state
}


export { buildState }
