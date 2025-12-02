const events_db = [];

const getEvents = (request, h) => {
  return events_db;
};

const postEvent = (request, h) => {
  events_db.push(request.payload);

  return "Event Created!";
};

module.exports = {
  getEvents,
  postEvent
};