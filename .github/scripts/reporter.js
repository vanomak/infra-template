const fs = require("fs");
const fetch = require("node-fetch");

function updateIssueDescription(trackerToken, trackerIssueId, trackerOrgId, description) {
  return fetch(`https://api.tracker.yandex.net/v2/issues/${trackerIssueId}`, {
    headers: {
      "Authorization": `Bearer ${trackerToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Org-ID": trackerOrgId,
    },
    method: "PATCH",
    body: JSON.stringify({
      description
    })
  });
}

const contents = fs.readFileSync('./content.txt');
updateIssueDescription(
  process.env.TRACKER_TOKEN,
  process.env.TRACKER_ISSUE_ID,
  process.env.TRACKER_ORG_ID,
  contents
).then(() => {
  console.log("Задача в трекере успешно обновлена");
}).catch(error => {
  console.log("Не удалось обновить задачу", error.getMessage);
});
