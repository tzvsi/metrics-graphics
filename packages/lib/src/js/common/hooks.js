/**
  Record of all registered hooks.
  For internal use only.
  Refer to Hooks doc: https://github.com/metricsgraphics/metrics-graphics/blob/8263f26c3a3ad4d07c5aa87d3d22cc494723cce3/HOOKS.md
*/
const _hooks = {}

/**
 * Register hook
 * @param {String} name event name
 * @param {Function} func callback function
 * @param {String} context event context
 * @returns {void}
 */
export function addHook (name, func, context) {
  var hooks
  if (!_hooks[name]) {
    _hooks[name] = []
  }
  hooks = _hooks[name]

  var alreadyRegistered = hooks.filter(function (hook) {
    return hook.func === func
  }).length > 0

  if (alreadyRegistered) {
    throw new Error('That function is already registered.')
  }

  hooks.push({
    func: func,
    context: context
  })
}

/**
 * Execute registered hooks
 * @param {String} name event name
 * @returns {void}
 */
export function callHook (name) {
  var hooks = _hooks[name]
  var result = [].slice.apply(arguments, [1])
  var processed

  if (hooks) {
    hooks.forEach(function (hook) {
      if (hook.func) {
        var params = processed || result

        if (params && params.constructor !== Array) {
          params = [params]
        }

        params = [].concat.apply([], params)
        processed = hook.func.apply(hook.context, params)
      }
    })
  }

  return processed || result
}
