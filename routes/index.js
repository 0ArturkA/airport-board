const { Router } = require('express');
const createError = require('http-errors');
const router = Router();

const { getSchedule } = require('../services/yandex-schedule');

const IATA_STATION = 'SIP';
const ITEMS_PER_PAGE = 10;

router.get('/', (_req, res) => res.redirect('/timetable/departure'));

router.get('/timetable/:event', (req, res, next) => {
  const { event } = req.params;
  const { offset = 0 } = req.query;

  if (event !== 'departure' && event !== 'arrival') {
    return next(createError.BadRequest('Invalid event'));
  }

  getSchedule({
    station: IATA_STATION,
    date: new Date().toLocaleDateString(),
    transport_types: 'plane',
    system: 'iata',
    result_timezone: 'Europe/Moscow',
    event,
    limit: ITEMS_PER_PAGE,
    offset
  })
    .then(data => res.render('index', data))
    .catch(next);
});

module.exports = router;
