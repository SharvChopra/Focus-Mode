const SERVER_URL = "http://localhost:5000";

async function checkFocusStatus() {
  try {
    const response = await fetch(`${SERVER_URL}/api/status`);

    if (!response.ok) {
      console.log("User is not logged in. Disabling blocking.");
      disableBlocking();
      return;
    }

    const data = await response.json();

    if (data.focusActive) {
      console.log("Focus mode is ON. Blocking sites:", data.blockedSites);
      enableBlocking(data.blockedSites);
    } else {
      console.log("Focus mode is OFF. Disabling blocking.");
      disableBlocking();
    }
  } catch (error) {
    console.error(
      "Error checking focus status. Is the backend server running?",
      error
    );
    disableBlocking();
  }
}

function enableBlocking(sitesToBlock) {
  const rules = sitesToBlock.map((site, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: `*://${site}/*`,
      resourceTypes: ["main_frame"],
    },
  }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: sitesToBlock.map((_, index) => index + 1), // List of IDs to remove
    addRules: rules,
  });
}

function disableBlocking() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({ length: 50 }, (_, i) => i + 1), // Remove up to 50 possible rule IDs
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Focus Mode extension installed.");
  chrome.alarms.create("focusCheck", { periodInMinutes: 1 });
  checkFocusStatus();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusCheck") {
    checkFocusStatus();
  }
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Browser started. Checking focus status.");
  checkFocusStatus();
});
