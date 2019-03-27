const mapSchedules = ({ thread, departure }) => ({
  number: thread.number,
  flight: thread.title,
  carrier: thread.carrier.title,
  vehicle: thread.vehicle,
  departure: +new Date(departure)
});

module.exports = ({ pagination, schedule, event }) => ({
  pagination,
  schedules: schedule.map(mapSchedules),
  event
});
