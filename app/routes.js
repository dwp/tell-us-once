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

// ---------- V1 prototype ---------- 

router.post('/v1/informer-details/name', function (req, res) {
  const name = req.session.data['informer-name']

  if (!name || name.trim() === "") {
    return res.render('v1/informer-details/name', {
      error: "Enter your name"
    })
  }
  res.redirect('/v1/informer-details/relationship-to-deceased')
})

router.post('/v1/informer-details/same-address-as-deceased', function (req, res) {
  const relationship = req.session.data['informer-relationship']

  if (!relationship || relationship.trim() === '') {
    return res.render('v1/informer-details/relationship-to-deceased', {
      error: "Select your relationship to Joe Bloggs"
    })
  }

  res.redirect('/v1/informer-details/same-address-as-deceased')
})

router.post('/v1/informer-details/informer-address', function (req, res) {
  const informerSameAddress = req.session.data['informer-same-address']

  if (informerSameAddress == "yes"){
    res.redirect('/v1/informer-details/informer-details-check-answers')
    } else {
        res.redirect('/v1/informer-details/informer-address')
    }
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
