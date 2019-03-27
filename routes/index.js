const { Router } = require('express');
const router = Router();

const { getSchedule } = require('../services/yandex-schedule');

router.get('/', (_req, res) => res.redirect('/timetable/departure'));

router.get('/timetable/:event', (req, res, next) => {
  const { event } = req.params;

  getSchedule(
    'SIP',
    new Date().toLocaleDateString(),
    'plane',
    'iata',
    'Europe/Moscow',
    event
  )
    .then(data => res.render('index', data))
    .catch(next);
});

module.exports = router;
