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

module.exports.loadAllSchedules = async params => {
  const allSchedules = [];

  // Load all pagination
  let offset = 0;
  while (true) {
    const { pagination, schedules } = await this.getSchedule({
      ...params,
      offset,
      limit: 100
    });

    allSchedules.push(...schedules);

    if (pagination.total <= pagination.offset + pagination.limit) {
      break;
    }
  }

  return allSchedules;
};

module.exports.findSchedulesByNumber = async (number, params) => {
  const schedules = await this.loadAllSchedules(params);
  const foundSchedules = schedules.filter(schedule =>
    schedule.number.includes(number)
  );
  const paginatedSchedules = foundSchedules.slice(params.offset, params.limit);
  return {
    pagination: {
      total: foundSchedules.length,
      limit: params.limit,
      offset: params.offset
    },
    schedules: paginatedSchedules,
    event: params.event
  };
};
