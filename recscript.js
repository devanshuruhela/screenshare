let start = document.getElementById("recordbutton"),
  stop = document.getElementById("stoprecbutton"),
  mediaRecorder;

start.addEventListener("click", async function () {
  let stream = await recordScreen();
  let mimeType = "video/mp4";
  mediaRecorder = createRecorder(stream, mimeType);
});

stop.addEventListener("click", function () {
  mediaRecorder.stop();
  location.reload();
});

async function recordScreen() {
  try{
  return await navigator.mediaDevices.getDisplayMedia({
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    video: { mediaSource: "screen" },
  });
}catch(err)
{
  console.log('error' , err);

}
}

function createRecorder(stream, mimeType) {
  // the stream data is stored in this array
  let recordings = [];

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (event) {
    if (event.data.size > 0) {
      recordings.push(event.data);
    }
  };
  mediaRecorder.onstop = function () {
    saveFile(recordings);
    recordings = [];
  };
  mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return mediaRecorder;
}

function saveFile(recordings) {
  const blob = new Blob(recordings, {
    type: "video/mp4",
  });
  let filename = window.prompt("Enter file name"),
    downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${filename}.webm`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(blob); // clear from memory
  document.body.removeChild(downloadLink);
}
