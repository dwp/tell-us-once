window.GOVUKPrototypeKit.documentReady(() => {
  const selectEl = document.querySelector('#autocomplete')
  const container = document.querySelector('#autocomplete-container')

  if (selectEl && container && window.accessibleAutocomplete) {
    window.accessibleAutocomplete.enhanceSelectElement({
      selectElement: selectEl,
      element: container,
      minLength: 2,
      showAllValues: false,
      defaultValue: ''
    })
  }
})