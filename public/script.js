const socket = io("/");
const myVideo = document.createElement("video");
const videoGrid = document.getElementById("video-grid");
myVideo.muted = true;

var myVideoStream;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    // set the stream into my global variable
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  });

// emit joining room event with socket
socket.emit("join-room", ROOM_ID);
socket.on("user-connected", () => {
  connectToNewUser();
});

const connectToNewUser = () => {
  console.log("new user is here");
};

const addVideoStream = (video, stream) => {
  // set the stream in video to play it
  video.srcObject = stream;
  //   listen to event to play the video
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  console.log(video);

  videoGrid.append(video);
};
