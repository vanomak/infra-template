const fs = require("fs");
const fetch = require("node-fetch");

function updateIssueDescription(trackerToken, trackerIssueId, trackerOrgId, description) {
  const options = {
    headers: {
      "Authorization": `Bearer ${trackerToken}`,
      "Content-Type": "application/json",
      "X-Org-ID": trackerOrgId,
    },
    method: "PATCH",
    body: JSON.stringify({
      description
    })
  };
  console.log("options", options);
  fetch(`https://api.tracker.yandex.net/v2/issues/${trackerIssueId}`, options)
    .then(response => {
      if (!response.ok) throw `Ошибка при обновлении. Status: ${response.status}`;
      return response.json();
    })
    .then(response => {
      console.log("Задача в трекере успешно обновлена");
    })
    .catch(error => {
      console.log("Не удалось обновить задачу", error);
      process.exit(1);
    });
}

const contents = fs.readFileSync('./content.txt').toString();
updateIssueDescription(
  process.env.TRACKER_TOKEN,
  process.env.TRACKER_ISSUE_ID,
  process.env.TRACKER_ORG_ID,
  contents
);
