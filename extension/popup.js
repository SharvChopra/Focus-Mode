const SERVER_URL = "http://localhost:5000";

async function updatePopup() {
  const statusContainer = document.getElementById("status-container");
  const statusText = document.getElementById("status-text");
  const timerDisplay = document.getElementById("timer");

  try {
    const response = await fetch(`${SERVER_URL}/api/status`);
    if (!response.ok) {
        throw new Error("Server error");
    }
    const data = await response.json();

    if (data.focusActive) {
      statusContainer.classList.remove("inactive");
      statusContainer.classList.add("active");
      statusText.innerText = "Focus Mode: ON";
      statusText.style.color = "#2f855a";
      
      // Calculate remaining time
      const endTime = new Date(data.endTime).getTime();
      const now = new Date().getTime();
      const diff = endTime - now;

      if (diff > 0) {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        timerDisplay.innerText = `${minutes}m ${seconds}s`;
      } else {
        timerDisplay.innerText = "Finishing...";
      }

    } else {
      statusContainer.classList.remove("active");
      statusContainer.classList.add("inactive");
      statusText.innerText = "Focus Mode: OFF";
      statusText.style.color = "#718096";
      timerDisplay.innerText = "--:--";
    }
  } catch (error) {
    statusText.innerText = "Not Connected";
    timerDisplay.innerText = "Backend Offline";
    console.error("Error fetching status:", error);
  }
}

// Update every second while popup is open
updatePopup();
setInterval(updatePopup, 1000);
