//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// ---------- V0 prototype ---------- 

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

// ---------- V0_1 prototype ---------- 

router.get('/v0_1/pensions/ni-number', function(req, res) {
  req.session.data['pensions'] = []; 
  req.session.data.returnTo = req.query.returnTo;
  res.render('/v0_1/pensions/ni-number');
});

router.post('/v0_1/pensions/ni-number', function (req, res) {
  if (req.session.data['has-ni-number'] == "yes"){
    const niNum = req.session.data['ni-number'].replace(/\s/g, '');
if (niNum == "QQ123456C"){
    res.redirect('/v0_1/pensions/no-public-sector-pensions-found')
} else if (niNum == "QQ112233C"){
    res.redirect('/v0_1/pensions/notify-a-public-sector-pension-provider')
} else
  {
  res.redirect('/v0_1/pensions/notify-a-public-sector-pension')
}
    } else {
        res.redirect('/v0_1/pensions/check-answers')
    }
});

router.get('/v0_1/pensions/notify-a-public-sector-pension', function(req, res) {
  req.session.data.returnTo = req.query.returnTo;
  res.render('/v0_1/pensions/notify-a-public-sector-pension');
});

router.post('/v0_1/pensions/notify-a-public-sector-pension', function (req, res) {
  const pensions = req.session.data['pensions']
  console.log(pensions)

  res.redirect('/v0_1/pensions/check-answers')
});

router.post('/v0_1/pensions/check-answers', function (req, res) {
  const notifyPension = req.session.data['notify-pension'];

  if (notifyPension === 'yes') {
    let pensions = req.session.data['pensions'];
    if (!Array.isArray(pensions)) {
      pensions = pensions ? [pensions] : [];
    }
    if (!pensions.includes('Civil Service Pension')) {
      pensions.push('Civil Service Pension');
    }
    req.session.data['pensions'] = pensions;
  } else {
    delete req.session.data['pensions'];
  }

  res.redirect('/v0_1/pensions/check-answers');
});

// ---------- V1 prototype ---------- 

router.post('/v1/registration-lookup-result', function (req, res) {
  const dod = normaliseDate(req.session.data['date-of-death-day'],  req.session.data['date-of-death-month'],  req.session.data['date-of-death-year']);
  console.log(dod);
  if (dod) {  
    const dateString = `${dod.day} ${dod.month} ${dod.year}`;  
    req.session.data['date-of-death'] = dateString;
    console.log("Date of death: " + req.session.data['date-of-death'])
  }
  if (req.session.data['deceased-surname'] == "Trout") {
    req.session.data['deceased-forename'] = "Kilgore"
    console.log("Forename: " == req.session.data['deceased-forename'])
  } else {
    req.session.data['deceased-forename'] = "Jane"
  }
  res.redirect('/v1/confirm-registration-details')
})

router.get('/v1/informer-details/informer-name', function(req, res) {  
  req.session.data.returnTo = req.query.returnTo;
  res.render('/v1/informer-details/informer-name');
})

router.post('/v1/informer-details/informer-name', function (req, res) {
  const name = req.session.data['informer-name'];

  if (!name || name.trim() === "") {
    return res.render('v1/informer-details/informer-name', {
      error: "Enter your name"
    })
  }
  if (req.session.data.returnTo) {    
    const next = req.session.data.returnTo;    
    req.session.data.returnTo = null;
    return res.redirect(next);
  }
  res.redirect('/v1/informer-details/informer-relationship')
})

router.get('/v1/informer-details/informer-name', function(req, res) {  
  req.session.data.returnTo = req.query.returnTo;
  res.render('/v1/informer-details/informer-name');
})

router.post('/v1/informer-details/informer-relationship', function (req, res) {
  const relationship = req.session.data['informer-relationship']

  if (!relationship || relationship.trim() === '') {
    return res.render('v1/informer-details/informer-relationship', {
      error: "Select your relationship to {{ data['deceased-forename']}} {{ data['deceased-surname']}}"
    })
  }
  if (req.session.data.returnTo) {    
    const next = req.session.data.returnTo;    
    req.session.data.returnTo = null;
    return res.redirect(next);
  }
  res.redirect('/v1/informer-details/informer-same-address-as-deceased')
})

router.get('/v1/informer-details/informer-same-address-as-deceased', function(req, res) {  
  req.session.data.returnTo = req.query.returnTo;
  res.render('/v1/informer-details/informer-same-address-as-deceased');
})

router.post('/v1/informer-details/informer-same-address-as-deceased', function (req, res) {
  const informerSameAddress = req.session.data['informer-same-address']

  if (informerSameAddress == "yes"){
    res.redirect('/v1/informer-details/informer-details-check-answers')
    } else {
        res.redirect('/v1/informer-details/informer-address')
    }
})

router.post('/v1/informer-details/select-informer-address', function (req, res) {
  const postcode = req.session.data['informer-postcode']

  if (postcode == "W9 1NJ"){
    res.redirect('/v1/informer-details/informer-select-address')
    } else {
        res.redirect('/v1/informer-details/informer-no-address-found')
    }
})

router.post('/v1/informer-details/confirm-informer-address', function (req, res) {
  const address = req.session.data['informer-address']

  const parts = address.split(",").map(s => s.trim());
  const addressLine1 = parts[0];
  const addressLine2 = parts[1] || "";
  const town = parts[2] || "";
  const postcode = parts[3] || "";

  req.session.data['informer-address-line-1'] = addressLine1;
  req.session.data['informer-address-line-2'] = addressLine2;
  req.session.data['informer-address-town'] = town;
  req.session.data['informer-postcode'] = postcode;

  res.redirect('/v1/informer-details/informer-confirm-address')
  
})

router.post('/v1/informer-details/check-answers', function (req, res) {
  req.session.data['informer-details-status'] = 'completed'
  res.redirect('/v1/task-list')
})

router.post('/v1/deceased-details/next-of-kin/are-you-the-next-of-kin', function (req, res) {
  if (req.session.data['deceased-next-of-kin-informer'] == 'no'){
    res.redirect('/v1/deceased-details/next-of-kin/next-of-kin-name')
  } else {
    res.redirect('/v1/deceased-details/next-of-kin/next-of-kin-check-answers')
    console.log('Success')
  }
})

router.post('/next-of-kin-complete', function (req, res) {
  req.session.data['next-of-kin-status'] = 'completed'
  res.redirect('/v1/task-list')
})

router.get('/next-of-kin-complete', function (req, res) {
  req.session.data['next-of-kin-status'] = 'completed'
  res.redirect('/v1/task-list')
})

router.get('/v1/deceased-details/spouse-or-partner/confirm-spouse', function (req, res) {
  const data = req.session.data
  const spouseTerms = ["husband", "wife", "spouse", "civil partner"]

  const informerIsSpouse =
    spouseTerms.includes((data['informer-relationship'] || "").toLowerCase())

  const nokIsSpouse =
    spouseTerms.includes((data['next-of-kin-relationship'] || "").toLowerCase())

  if (informerIsSpouse) {
    res.redirect('/v1/deceased-details/spouse-or-partner/confirm-informer')
  } else if (nokIsSpouse) {
    res.redirect('/v1/deceased-details/spouse-or-partner/confirm-next-of-kin')
  } else {
    res.redirect('/v1/deceased-details/spouse-or-partner/who-is-spouse')
  }
})


// ---------- Utilities ---------- 

function normaliseDate(day, month, year) {

  if (!day || !month || !year) {
    console.error("Missing date field(s)");
    return null;
  }

  day = String(day).trim();
  month = String(month).trim().toLowerCase();
  year = String(year).trim();

  if (/^\d+$/.test(day)) day = String(parseInt(day, 10));
  if (/^\d+$/.test(month)) month = String(parseInt(month, 10));

  const monthMap = {
    "jan": "january", "january": "january", "1": "january",
    "feb": "february", "february": "february", "2": "february",
    "mar": "march", "march": "march", "3": "march",
    "apr": "april", "april": "april", "4": "april",
    "may": "may", "5": "may",
    "jun": "june", "june": "june", "6": "june",
    "jul": "july", "july": "july", "7": "july",
    "aug": "august", "august": "august", "8": "august",
    "sep": "september", "sept": "september", "september": "september", "9": "september",
    "oct": "october", "october": "october", "10": "october",
    "nov": "november", "november": "november", "11": "november",
    "dec": "december", "december": "december", "12": "december"
  };

  if (monthMap[month]) {
    month = monthMap[month];
  } else {
    console.error("Invalid month input");
    return null;
  }

  return { day, month, year };
}