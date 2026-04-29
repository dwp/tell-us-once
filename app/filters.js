// app/filters.js
const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Format as titlecase
addFilter('titlecase', function (str) {
  if (typeof str !== 'string') {
    return ''
  }

  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
});

// Format long form dates
addFilter("date", (date) => { 
  const value = date ?? new Date(); 
  
  return new Date(value).toLocaleDateString("en-GB", { 
    day: "numeric", 
    month: "long", 
    year: "numeric", 
  }); 
});


// Format NI numebers as QQ 11 22 33 C
addFilter('formatNiNumber', function (ni) {
  if (!ni) return ni;

  return ni.replace(
    /^([A-Z]{2})(\d{2})(\d{2})(\d{2})([A-Z])$/,
    '$1 $2 $3 $4 $5'
  );
});
