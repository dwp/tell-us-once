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
