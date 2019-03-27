const fetch = require('node-fetch');
const qs = require('querystring');

const mapSchedule = require('../mappings/timetable');

module.exports.getSchedule = (
  station,
  date,
  transportTypes,
  system,
  result_timezone,
  event
) => {
  const params = qs.stringify({
    station,
    date,
    transport_types: transportTypes,
    system,
    result_timezone,
    event
  });

  return fetch(`https://api.rasp.yandex.net/v3.0/schedule/?${params}`, {
    headers: {
      Authorization: process.env.YANDEX_SCHEDULE_API
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error.text);
      }

      return mapSchedule(data);
    });
};
