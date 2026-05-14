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

fetch("https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/commits/main")
  .then(res => res.json())
  .then(data => {
    const lastCommit = data.commit.committer.date;
    console.log(lastCommit);
  });
