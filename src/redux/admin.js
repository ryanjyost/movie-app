import update from "immutability-helper";
import Helpers from "./helpers";
const { createAction } = Helpers;

const getAllFeedback = createAction("GET_ALL_FEEDBACK", {
  success: feedback => ({ feedback })
});

const respondToFeedback = createAction("RESPOND_TO_FEEDBACK", {
  request: (feedbackId, message) => ({ feedbackId, message }),
  success: updatedFeedback => ({ updatedFeedback })
});

const messageAll = createAction("MESSAGE_ALL", {
  request: message => ({ message })
});

const getLogs = createAction("GET_LOGS", {
  success: logs => ({ logs })
});

export const actions = {
  getAllFeedback,
  respondToFeedback,
  messageAll,
  getLogs
};

// reducer with initial state
const initialState = {
  feedback: [],
  logs: [],
  httpLogs: [],
  otherLogs: [],
  stats: null
};

export function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case getAllFeedback.types.success:
      return update(state, {
        feedback: { $set: payload.feedback.feedback },
        stats: { $set: payload.feedback.stats }
      });
    case respondToFeedback.types.success:
      const oldFeedback = [...state.feedback];
      const updatedFeedback = oldFeedback.map(item => {
        if (item._id === payload.updatedFeedback._id) {
          return payload.updatedFeedback;
        } else {
          return item;
        }
      });
      return update(state, {
        feedback: { $set: updatedFeedback }
      });
    case getLogs.types.success:
      const { logs } = payload;
      let httpLogs = [],
        otherLogs = [];

      for (let log of logs) {
        let jsonMessage = "";
        try {
          jsonMessage = JSON.parse(log.message);
        } catch (e) {
          jsonMessage = log.message;
        }

        if (typeof jsonMessage === "object" && "method" in jsonMessage) {
          httpLogs.push({ ...log, ...jsonMessage });
        } else {
          otherLogs.push(log);
        }
      }
      return update(state, {
        logs: { $set: payload.logs },
        httpLogs: { $set: httpLogs },
        otherLogs: { $set: otherLogs }
      });
    default:
      return state;
  }
}

export default reducer;
