let start = document.getElementById("recordbutton"),
  stop = document.getElementById("stoprecbutton"),
  mediaRecorder;

start.addEventListener("click", async function () {
  let stream = await recordScreen();
  mediaRecorder = createRecorder(stream);
});

stop.addEventListener("click", function () {
  mediaRecorder.stop();
  location.reload();
});

async function recordScreen() {
  try{
  return await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: { mediaSource: "screen" },
  });
}catch(err)
{
  console.log('error' , err);

}
}

function createRecorder(stream) {
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
  downloadLink.download = `${filename}.mp4`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(blob); // clear from memory
  document.body.removeChild(downloadLink);
}
