/* eslint-disable no-unused-vars */

/**
 * @param params
 */
function split (params) {
  const text = params.text || ''
  const words = text.split(' ')
  return { words }
}

/**
 * @param params
 */
function split1 (params) {
  const text = params.text || 'Hello World'
  const words = text.split(' ')
  return { words }
}
