/* eslint-disable no-unused-vars */

function split (params) {
  const text = params.text || ''
  const words = text.split(' ')
  return { words: words }
}

function split1 (params) {
  const text = params.text || 'Hello World'
  const words = text.split(' ')
  return { words: words }
}
