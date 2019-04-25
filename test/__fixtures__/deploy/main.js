/* eslint-disable no-unused-vars */

function split (params) {
  let text = params.text || ''
  let words = text.split(' ')
  return { words: words }
}

function split1 (params) {
  let text = params.text || 'Hello World'
  let words = text.split(' ')
  return { words: words }
}
