const fs = require("fs");
const fetch = require("node-fetch");

function updateIssueDescription(trackerToken, trackerIssueId, trackerOrgId, description) {
  console.log(`trackerOrgId: ${trackerOrgId}`);
  fetch(`https://api.tracker.yandex.net/v2/issues/${trackerIssueId}`, {
    headers: {
      "Authorization": `Bearer ${trackerToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Org-ID": trackerOrgId,
    },
    method: "PATCH",
    body: JSON.stringify({
      description
    })
  })
    .then(response => {
      if (!response.ok) throw `Ошибка при обновлении. Status: ${response.status}`;
      return response.json();
    })
    .then(response => {
      console.log("Задача в трекере успешно обновлена");
    })
    .catch(error => {
      console.log("Не удалось обновить задачу", error);
    });
}

const contents = fs.readFileSync('./content.txt');
updateIssueDescription(
  process.env.TRACKER_TOKEN,
  process.env.TRACKER_ISSUE_ID,
  process.env.TRACKER_ORG_ID,
  contents
);
