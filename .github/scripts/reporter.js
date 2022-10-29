const fs = require("fs");
const fetch = require("node-fetch");

function getCommonHeaders(trackerToken, trackerOrgId) {
  return {
    "Authorization": `Bearer ${trackerToken}`,
    "Content-Type": "application/json",
    "X-Org-ID": trackerOrgId,
  }
}

function updateIssueDescription(trackerToken, trackerIssueId, trackerOrgId, releaseTag, description) {
  const date = new Date();
  const formattedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
  const summary = `Релиз ${releaseTag} от ${formattedDate}`;

  const options = {
    headers: getCommonHeaders(trackerToken, trackerOrgId),
    method: "PATCH",
    body: JSON.stringify({
      summary,
      description: description.replace('\r', '\n')
    })
  };
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

function addComment(trackerToken, trackerIssueId, trackerOrgId, releaseTag) {
  const text = `Собрали и опубликовали <a href="https://hub.docker.com/r/vanomak/cra_app">образ</a> с тегом ${releaseTag}`;
  const options = {
    headers: getCommonHeaders(trackerToken, trackerOrgId),
    method: "POST",
    body: JSON.stringify({
      text
    })
  };
  fetch(`https://api.tracker.yandex.net/v2/issues/${trackerIssueId}/comments`, options)
    .then(response => {
      if (!response.ok) throw `Ошибка при добавлении комментария. Status: ${response.status}`;
      return response.json();
    })
    .then(response => {
      console.log("Комментарий успешно добавлен");
    })
    .catch(error => {
      console.log("Ошибка", error);
      process.exit(1);
    });
}
const content = fs.readFileSync('./content.txt',
  {
    encoding: 'utf8'
  }
);
updateIssueDescription(
  process.env.TRACKER_TOKEN,
  process.env.TRACKER_ISSUE_ID,
  process.env.TRACKER_ORG_ID,
  process.env.GIT_TAG,
  content
);
addComment(
  process.env.TRACKER_TOKEN,
  process.env.TRACKER_ISSUE_ID,
  process.env.TRACKER_ORG_ID,
  process.env.GIT_TAG
);
