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
  const rules = sitesToBlock.map((site, index) => {
    // Basic cleaning to ensure we have a clean domain
    const domain = site.replace(/^https?:\/\//, "").replace(/^www\./, "").split('/')[0];

    return {
      id: index + 1,
      priority: 1,
      action: {
        type: "redirect",
        redirect: { extensionPath: "/blocked.html" } // Ensure blocked.html exists in extension folder
      },
      condition: {
        urlFilter: `||${domain}`,
        resourceTypes: ["main_frame"],
      },
    };
  });

  // Clear existing rules first, then add new ones
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const removeRuleIds = existingRules.map((rule) => rule.id);
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: removeRuleIds,
      addRules: rules,
    });
  });
}

function disableBlocking() {
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const removeRuleIds = existingRules.map((rule) => rule.id);
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: removeRuleIds,
    });
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
