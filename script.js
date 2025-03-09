function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('result').innerText = `Scanned: ${decodedText}`;
    saveScannedData(decodedText);
}

function onScanFailure(error) {
    // Handle scan failure (optional, for debugging)
}

function saveScannedData(data) {
    let scans = JSON.parse(localStorage.getItem("scanHistory")) || [];
    scans.push(data);
    localStorage.setItem("scanHistory", JSON.stringify(scans));
    displayScanHistory();
}

function displayScanHistory() {
    let scans = JSON.parse(localStorage.getItem("scanHistory")) || [];
    let historyList = document.getElementById("history");
    historyList.innerHTML = "";
    scans.forEach(scan => {
        let li = document.createElement("li");
        li.textContent = scan;
        historyList.appendChild(li);
    });
}

displayScanHistory();

let html5QrCode = new Html5Qrcode("reader");
html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    onScanSuccess,
    onScanFailure
);
