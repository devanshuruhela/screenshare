const videoelement = document.getElementById('video');
const startbtn = document.getElementById('startbutton');
const stopbtn = document.getElementById("stopbutton");
const sharebtn = document.getElementById("sharebutton");

//promt to select media / then pass that to video element / then play
async function selectMediaStream()
{
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoelement.srcObject =  mediaStream;
    videoelement.onloadedmetadata = ()=>
    {
      videoelement.play();
    }
  } catch (error) {
    
  }
}

// start picture in picture 
startbtn.addEventListener('click' , async()=>{
  startbtn.disabled = true;
  await videoelement.requestPictureInPicture();
  startbtn.disabled = false;
});
//stop
stopbtn.addEventListener('click' , ()=>
{
  location.reload();
})
//share button load
sharebtn.addEventListener('click' , selectMediaStream);