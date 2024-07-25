// Get access to the video element and the canvas
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const context = canvas.getContext('2d');

// Prompt the user for permission to access the camera and stream it to the video element
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing camera: ', err);
    });

// Capture the video frame and draw it on the canvas when the button is clicked
captureButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
        alert('QR Code detected: ' + code.data);
        // Process the QR code data as needed
    } else {
        alert('No QR code detected.');
    }
});
