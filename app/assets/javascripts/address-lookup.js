document.addEventListener("DOMContentLoaded", function () {

  const postcodeLookup = document.getElementById("postcode-lookup");
  const resultsContainer = document.getElementById("address-results");
  const manualContainer = document.getElementById("manual-address");

  const findButton = document.getElementById("find-address");
  const manualLink = document.getElementById("enter-address-manually");
  const returnToLookup = document.getElementById("return-to-lookup");

  const status = document.getElementById("address-status");

  findButton.addEventListener("click", function () {

    const postcode = document.getElementById("postcode").value.trim();
    const searchString = document.getElementById("searchString").value.trim();

    const mockedResults = [
      "10 Prospect Cottage, Worthing, BN11 5RG",
      "11 Prospect Cottage, Worthing, BN11 5RG",
      "Flat 1, 12 Prospect Road, Worthing BN11 5RG",
    ];

    let html = `
      <fieldset class="govuk-fieldset">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
          Select an address
        </legend>

        <p class="govuk-body">
          ${mockedResults.length} addresses found for
          <b>${postcode || "your postcode"}</b>
          and <b>${searchString || "your search"}</b>.
        </p>

        <div class="govuk-radios govuk-radios--small" data-module="govuk-radios">
    `;

    mockedResults.forEach((address, index) => {
      html += `
        <div class="govuk-radios__item">
          <input class="govuk-radios__input"
                 id="address-${index}"
                 name="selectedAddress"
                 type="radio"
                 value="${address}">
          <label class="govuk-label govuk-radios__label" for="address-${index}">
            ${address}
          </label>
        </div>
      `;
    });

    html += `
        </div>
      </fieldset>
    `;

    resultsContainer.innerHTML = html;

    status.textContent = `${mockedResults.length} addresses found.`;

    resultsContainer.hidden = false;
    manualContainer.hidden = true;

    const firstRadio = resultsContainer.querySelector("input[type=radio]");
    if (firstRadio) firstRadio.focus();
  });


  manualLink.addEventListener("click", function (e) {
    e.preventDefault();

    postcodeLookup.hidden = true;
    resultsContainer.hidden = true;

    manualContainer.hidden = false;

    status.textContent = "Manual address entry now displayed.";

    document.getElementById("address-line-1").focus();
  });

  returnToLookup.addEventListener("click", function (e) {
    e.preventDefault();

    manualContainer.hidden = true;
    resultsContainer.hidden = true;
    postcodeLookup.hidden = false;

    status.textContent = "Postcode lookup displayed.";

    document.getElementById("postcode").focus();
  });

});