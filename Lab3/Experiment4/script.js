// DATA STORAGE
let activityLog = [];
let clickCount = 0;
let clickThreshold = 10;   // suspicious if >10 clicks in 10 seconds

// Utility: Add entry to log array + DOM
function logActivity(type, details) {
    let entry = {
        type,
        details,
        time: new Date().toLocaleTimeString()
    };

    activityLog.push(entry);
    displayLog(entry);
}

// Add to DOM
function displayLog(entry) {
    const box = document.getElementById("logBox");

    let div = document.createElement("div");
    div.className = "log-entry";
    div.innerText = `[${entry.time}] ${entry.type} → ${entry.details}`;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

// CLICK TRACKING (BUBBLING + CAPTURING)
document.addEventListener("click", (e) => {
    clickCount++;
    logActivity("Click", `Target: ${e.target.tagName}`);
}, true);   // capturing mode

document.addEventListener("click", (e) => {
    logActivity("Click (Bubbled)", `Target: ${e.target.tagName}`);
});        // bubbling phase

// Suspicious activity checker
setInterval(() => {
    if (clickCount > clickThreshold) {
        document.getElementById("warning").innerText =
            "⚠ Suspicious Activity: Too many clicks!";
    } else {
        document.getElementById("warning").innerText = "";
    }
    clickCount = 0; // reset count
}, 10000); // every 10 seconds

// KEY PRESS TRACKING
document.addEventListener("keydown", (e) => {
    logActivity("Key Press", `Key: ${e.key}`);
});

// FOCUS TRACKING
document.getElementById("focusInput").addEventListener("focus", () => {
    logActivity("Focus", "Input field focused");
});

document.getElementById("focusInput").addEventListener("blur", () => {
    logActivity("Blur", "Input field lost focus");
});

// RESET LOG
document.getElementById("resetBtn").addEventListener("click", () => {
    activityLog = [];
    document.getElementById("logBox").innerHTML = "";
    document.getElementById("warning").innerText = "";
});

// EXPORT LOG AS TEXT
document.getElementById("exportBtn").addEventListener("click", () => {
    let text = activityLog.map(
        e => `[${e.time}] ${e.type}: ${e.details}`
    ).join("\n");

    let blob = new Blob([text], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "activity_log.txt";
    a.click();
});
