const fs = require("fs");
const fetch = require("node-fetch");

async function updateIssueDescription(trackerToken, trackerIssueId, trackerOrgId, description) {
  try {
    await fetch(`https://api.tracker.yandex.net/v2/issues/${trackerIssueId}`, {
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
    console.log("Задача в трекере успешно обновлена");
  } catch (error) {
    console.log("Не удалось обновить задачу", error.getMessage);
  }
}

const contents = fs.readFileSync('./content.txt');
await updateIssueDescription(
  process.env.TRACKER_TOKEN,
  process.env.TRACKER_ISSUE_ID,
  process.env.TRACKER_ORG_ID,
  contents
);
