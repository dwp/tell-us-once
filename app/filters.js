// app/filters.js
const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Titlecase: first letter of each word
addFilter('titlecase', function (str) {
  if (typeof str !== 'string') {
    return ''
  }

  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
});

