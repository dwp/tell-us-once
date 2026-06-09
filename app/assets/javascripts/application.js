window.GOVUKPrototypeKit.documentReady(() => {

  // Registration district
  const selectEl = document.querySelector('#autocomplete')
  const container = document.querySelector('#autocomplete-container')

  if (selectEl && container && window.accessibleAutocomplete) {
    window.accessibleAutocomplete.enhanceSelectElement({
      selectElement: selectEl,
      element: container,
      minLength: 2,
      showAllValues: false
    })
  }

  // Informer relationship
const relSelect = document.querySelector('#autocomplete-relationship')
const relContainer = document.querySelector('#autocomplete-relationship-container')

if (relSelect && relContainer && window.accessibleAutocomplete) {
  window.accessibleAutocomplete.enhanceSelectElement({
    selectElement: relSelect,
    element: relContainer,
    minLength: 0,
    showAllValues: true,
    dropdownArrow: () => ''
  })
}

})