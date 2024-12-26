// console.log("video player");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

//상태들
let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused
    ? "fa-solid fa-play"
    : "fa-solid fa-pause";
};
const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  // muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  muteBtnIcon.classList = video.muted
    ? "fa-solid fa-volume-xmark"
    : "fa-solid fa-volume-high";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange = (event) => {
  // console.log(e.target.value);
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }

  volumeValue = value;
  video.volume = volumeValue;
};
const formatTime = (seconds) => {
  //국제표준시간
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};
const handleLoadedMetadata = () => {
  const videoDurationTime = Math.floor(video.duration);
  totalTime.innerText = formatTime(videoDurationTime);
  //range타입의 최댓값
  timeline.max = videoDurationTime;
};
const handleTimeUpdate = () => {
  // console.log(video.currentTime);
  const videoCurrentTime = Math.floor(video.currentTime);
  currentTime.innerText = formatTime(videoCurrentTime);
  timeline.value = videoCurrentTime;
};
const handleTimelineChange = (event) => {
  // console.log(event.target.value);
  const {
    target: { value },
  } = event;

  video.currentTime = value;
};
const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  // document.fullscreenElement : 브라우저가 fullscreen인지 아닌지 확인
  if (fullScreen) {
    document.exitFullscreen();
    // fullScreenBtn.innerText = "Enter Full Screen";
    fullScreenBtnIcon.classList = "fa-solid fa-expand";
  } else {
    videoContainer.requestFullscreen();
    // fullScreenBtn.innerText = "Exit Full Screen";
    fullScreenBtnIcon.classList = "fa-solid fa-compress";
  }
};
const hideControls = () => videoControls.classList.remove("showing");
const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 1500);
  // setTimeout이 작동되면 얘만의 고유한 id가 생성됨
  // console.log(controlsTimeout);
};
const changeVideoTime = (seconds) => {
  video.currentTime += seconds;
};
document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
  if (event.code === "ArrowRight") {
    changeVideoTime(5);
  }
  if (event.code === "ArrowLeft") {
    changeVideoTime(-5);
  }
});
// console.log(videoContainer.dataset); // id: "675f9594a5e485551afe23c5"
const handleEnded = () => {
  // console.log("Video Finished");
  // registerView가 이때 작동
  // 먼저 url값 찾아오기
  // watch.pug에 id를 심어놓고 찾아오기 data-id=video._id
  const {
    dataset: { id },
  } = videoContainer;
  fetch(`/api/videos/${id}/watch`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
// "input" : "change" 보다 더 실시간으로 반영
video.addEventListener("loadeddata", handleLoadedMetadata);
// "loadedmetadata" : 메타데이터가 로드되면 이벤트 시작
// loadeddata가 loadedmetadata보다 폭이 넓음
video.addEventListener("timeupdate", handleTimeUpdate);
// "timeupdate" : timeupdate속성에 의해 표시된 시간이 currentTime이 업데이트되면 이벤트가 시작
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlayClick);
video.addEventListener("ended", handleEnded);
