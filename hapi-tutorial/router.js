const { postEvent, getEvents } = require("./controllers/events.controllers");

const router = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Hello World!";
    }
  },
  {
    method: "POST",
    path: "/post_event",
    handler: postEvent
  },
  {
    method: "GET",
    path: "/events_list",
    handler: getEvents
  }
];

module.exports = router;