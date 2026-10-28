const verificationConfig = {
  currentServerId: "1365037609373401250",
  currentServerName: "つっくん帝国☭絶対主義",
  backupServerUrl: "https://discord.gg/am73aarrJP",
  fallbackMethod: "",
};

const byId = (id) => document.getElementById(id);
const fallbackMethod = verificationConfig.fallbackMethod.trim();
byId("current-server-name").textContent = verificationConfig.currentServerName;
byId("current-server-id").textContent = verificationConfig.currentServerId;

const backupLink = byId("backup-server");
if (verificationConfig.backupServerUrl.trim()) {
  backupLink.href = verificationConfig.backupServerUrl;
}

function showServerState(state, label, method, issue) {
  const badge = byId("server-state");
  badge.textContent = label;
  badge.classList.toggle("is-live", state === "live");
  badge.classList.toggle("is-unavailable", state === "unavailable");
  const methodField = byId("current-method");
  if (state === "live") {
    const serverPrefix = document.createTextNode("対象サーバーで");
    const emphasizedRule = document.createElement("strong");
    emphasizedRule.className = "method-emphasis";
    emphasizedRule.textContent = "「つっくん本人」ロールが付与されていること";
    methodField.replaceChildren(serverPrefix, emphasizedRule);
  } else {
    methodField.textContent = method;
  }
  const issueNote = byId("widget-issue-note");
  issueNote.replaceChildren();
  if (issue) {
    const emphasis = document.createElement("strong");
    emphasis.className = "method-emphasis";
    emphasis.textContent = issue;
    issueNote.append(emphasis);
  }
  byId("widget-issue").hidden = !issue;
}

function checkWidgetImage() {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timeoutId = setTimeout(() => reject(new Error("widget image timeout")), 8000);
    image.onload = () => { clearTimeout(timeoutId); resolve(); };
    image.onerror = () => { clearTimeout(timeoutId); reject(new Error("widget image unavailable")); };
    image.src = "https://discord.com/api/guilds/" +
      encodeURIComponent(verificationConfig.currentServerId) +
      "/widget.png?style=shield&check=" + Date.now();
  });
}

async function checkCurrentServer() {
  const button = byId("refresh-widget");
  button.disabled = true;
  byId("widget-issue").hidden = true;
  byId("server-state").textContent = "確認中";
  byId("current-method").textContent = "確認中";

  try {
    await checkWidgetImage();
    showServerState(
      "live",
      "ウィジェット確認済み",
      "対象サーバーで「つっくん本人」ロールが付与されていること",
      ""
    );
  } catch {
    showServerState(
      "unavailable",
      "確認できません",
      fallbackMethod || "バックアップサーバーで案内を確認してください。",
      "削除、ウィジェット停止、または通信障害の可能性があります。"
    );
  } finally {
    button.disabled = false;
  }
}

byId("refresh-widget").addEventListener("click", checkCurrentServer);
checkCurrentServer();

