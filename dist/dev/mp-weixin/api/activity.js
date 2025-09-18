"use strict";
const utils_request = require("../utils/request.js");
function getActivityDetail(activityId) {
  return utils_request.get("mp/club/activity_detail", {
    activityId
  });
}
exports.getActivityDetail = getActivityDetail;
