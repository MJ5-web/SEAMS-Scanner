document.addEventListener("DOMContentLoaded", function () {
    function onScanSuccess(decodedText, decodedResult) {
        document.getElementById('result').innerText = `Scanned: ${decodedText}`;
        saveScannedData(decodedText);
    }

    function onScanFailure(error) {
        console.warn(`QR Scan Error: ${error}`);
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

    // Ensure camera access works
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            let html5QrCode = new Html5Qrcode("reader");
            html5QrCode.start(
                { facingMode: "environment" },  // Use rear camera
                { fps: 10, qrbox: { width: 250, height: 250 } },
                onScanSuccess,
                onScanFailure
            );
        })
        .catch(function (err) {
            alert("Camera access denied or not available.");
            console.error("Camera Error:", err);
        });
});

