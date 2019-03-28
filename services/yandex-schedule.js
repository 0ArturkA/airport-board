const fetch = require('node-fetch');
const qs = require('querystring');

const mapSchedule = require('../mappings/timetable');

module.exports.getSchedule = params => {
  const query = qs.stringify(params);

  return fetch(`https://api.rasp.yandex.net/v3.0/schedule/?${query}`, {
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
