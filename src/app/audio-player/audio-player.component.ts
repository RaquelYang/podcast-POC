import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  _elements;

  _currentTrack = null;
  _playAHead = false;
  _progressCounter = 0;
  // _progressBarIndicator = this._elements.progressBar?.children[0].children[0].children[1] as HTMLElement;
  _progressBarIndicator;
  _trackLoaded = false;

  constructor() { }

  ngOnInit(): void {
    this._elements = {
    audio: document.getElementById("audio") as HTMLAudioElement,
    playerButtons: {
      largeToggleBtn: document.querySelector(".large-toggle-btn") as HTMLButtonElement,
      nextTrackBtn: document.querySelector(".next-track-btn") as HTMLButtonElement,
      previousTrackBtn: document.querySelector(".previous-track-btn") as HTMLElement,
      smallToggleBtn: document.getElementsByClassName("small-toggle-btn")
    },
    progressBar: document.querySelector(".progress-box") as HTMLElement,
    playListRows: document.getElementsByClassName("play-list-row"),
    trackInfoBox: document.querySelector(".track-info-box") as HTMLElement
  };
    this._progressBarIndicator = this._elements.progressBar;

    setTimeout(() => {
      this.initPlayer()
    },1000)

  }

  _bufferProgress(audio: any) {
    const bufferedTime = (audio.buffered.end(0) * 100) / audio.duration;
    const progressBuffer = this._elements.progressBar?.children[0].children[0].children[0] as HTMLElement;

    progressBuffer.style.width = bufferedTime + "%";
  };

  _getXY (e) {
    const containerX = this._elements.progressBar.offsetLeft;
    const containerY = this._elements.progressBar.offsetTop;

    const coords = {
      x: null,
      y: null
    };

    const isTouchSuopported = "ontouchstart" in window;

    if (isTouchSuopported) { //For touch devices
      coords.x = e.clientX - containerX;
      coords.y = e.clientY - containerY;

      return coords;
    } else if (e.offsetX || e.offsetX === 0) { // For webkit browsers
      coords.x = e.offsetX;
      coords.y = e.offsetY;

      return coords;
    } else if (e.layerX || e.layerX === 0) { // For Mozilla firefox
      coords.x = e.layerX;
      coords.y = e.layerY;

      return coords;
    }
    return coords;
  };

  _handleProgressIndicatorClick = function(e) {
    const progressBar = document.querySelector(".progress-box") as HTMLElement;
    const xCoords = this._getXY(e).x;
    const progressBarChildren = progressBar.children[0] as HTMLElement;

    return (xCoords - progressBar.offsetLeft) / progressBarChildren.offsetWidth;
  };

  initPlayer() {

    // disable 上一首 btn
    if (this._currentTrack === 1 || this._currentTrack === null) {
      console.log('this._elements.playerButtons.previousTrackBtn', this._elements.playerButtons.previousTrackBtn);
      // this._elements.playerButtons.previousTrackBtn.disabled = true;
      console.log('this._elements.playerButtons.previousTrackBtn', this._elements.playerButtons.previousTrackBtn);
    }

    //Adding event listeners to playlist clickable elements.
    for (var i = 0; i < this._elements.playListRows.length; i++) {
      var smallToggleBtn = this._elements.playerButtons.smallToggleBtn[i];
      var playListLink = this._elements.playListRows[i].children[2].children[0];

      //Playlist link clicked.
      playListLink.addEventListener("click", (e) => {
        e.preventDefault();
        console.log('playListLink');
        // var selectedTrack = parseInt(this.parentNode.parentNode.getAttribute("data-track-row"));
        var selectedTrack = '1'

        if (selectedTrack !== this._currentTrack) {
          this._resetPlayStatus();
          this._currentTrack = null;
          this._trackLoaded = false;
        }

        if (this._trackLoaded === false) {
          this._currentTrack = parseInt(selectedTrack);
          this._setTrack();
        } else {
          this._playBack();
        }
      }, false);

      //Small toggle button clicked.
      smallToggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // var selectedTrack = parseInt(this.parentNode.getAttribute("data-track-row"));
        var selectedTrack = '2'
        if (selectedTrack !== this._currentTrack) {
          this._resetPlayStatus();
          this._currentTrack = null;
          this._trackLoaded = false;
        }

        if (this._trackLoaded === false) {
          this._currentTrack = parseInt(selectedTrack);
          this._setTrack();
        } else {
          this._playBack();
        }

      }, false);
    }

    //Audio time has changed so update it.
    this._elements.audio.addEventListener("timeupdate", () => {
      this._trackTimeChanged();
    }, false);

    //Audio track has ended playing.
    this._elements.audio.addEventListener("ended", (e) => {
      this._trackHasEnded();
    }, false);

    //Large toggle button clicked.
    this._elements.playerButtons.largeToggleBtn.addEventListener("click", (e) => {
      if (this._trackLoaded === false) {
        this._currentTrack = parseInt('1');
        this._setTrack()
      } else {
        this._playBack();
      }
    }, false);

    //Next track button clicked.
    this._elements.playerButtons.nextTrackBtn.addEventListener("click", (e) => {
      if (this._elements.playerButtons.nextTrackBtn.disabled !== true) {
        this._currentTrack++;
        this._trackLoaded = false;
        this._resetPlayStatus();
        this._setTrack();
      }
    }, false);

    //Previous track button clicked.
    // console.log('this._elements.playerButtons.previousTrackBtn',this._elements.playerButtons.previousTrackBtn);
    this._elements.playerButtons.previousTrackBtn.addEventListener("click", (e) => {
      if (this._elements.playerButtons.nextTrackBtn.disabled !== true) {
        this._currentTrack--;
        this._trackLoaded = false;
        this._resetPlayStatus();
        this._setTrack();
      }
    }, false);

    //User is moving progress indicator.
    console.log('this._progressBarIndicator', this._progressBarIndicator);
    // this._progressBarIndicator.addEventListener("mousedown",(e) => {
    //   this._mouseDown(e)
    // }, false);

    //User stops moving progress indicator.
    window.addEventListener("mouseup", (e) => {
      this._mouseUp(e)
    }, false);
  };

  _mouseDown(e) {
    document.addEventListener("mousemove", (e) => {
      this._moveProgressIndicator(e);
    }, true);

    this._elements.audio.removeEventListener("timeupdate", () => {
      this._trackTimeChanged();
    }, false);

    this._playAHead = true;
  };

  _mouseUp(e) {
    if (this._playAHead === true) {
      const duration =this._elements.audio.duration;
      const progressIndicatorClick = this._handleProgressIndicatorClick(e);
      window.removeEventListener("mousemove", (e) => {
        this._moveProgressIndicator(e)
      }, true);

      this._elements.audio.currentTime = duration * progressIndicatorClick;
      this._elements.audio.addEventListener("timeupdate", () => {
        this._trackTimeChanged()
      }, false);
      this._playAHead = false;
    }
  };

  _moveProgressIndicator(e) {
    let newPosition = 0;
    const progressBarOffsetLeft = this._elements.progressBar.offsetLeft;
    let progressBarWidth = 0;
    const progressBarIndicator = this._elements.progressBar.children[0].children[0].children[1] as HTMLElement;
    const progressBarIndicatorWidth = this._progressBarIndicator.offsetWidth;
    const xCoords = this._getXY(e).x;
    const progressBarChildren = this._elements.progressBar.children[0] as HTMLElement
    progressBarWidth = progressBarChildren.offsetWidth - progressBarIndicatorWidth;
    newPosition = xCoords - progressBarOffsetLeft;

    if ((newPosition >= 1) && (newPosition <= progressBarWidth)) {
      progressBarIndicator.style.left = newPosition + ".px";
    }
    if (newPosition < 0) {
      progressBarIndicator.style.left = "0";
    }
    if (newPosition > progressBarWidth) {
      progressBarIndicator.style.left = progressBarWidth + "px";
    }
  };

  _playBack() {
    console.log('this._elements.audio', this._elements.audio);
    if (this._elements.audio.paused) {
      this._elements.audio.play();
      this._updatePlayStatus(true);
      document.title = "\u25B6 " + document.title;
    } else {
      this._elements.audio.pause();
      this._updatePlayStatus(false);
      document.title = document.title.substr(2);
    }
  };

  _setTrack() {
    const audioChildren = this._elements.audio.children[this._currentTrack - 1] as HTMLAudioElement
    var songURL = audioChildren.src;

    this._elements.audio.setAttribute("src", songURL);
    this._elements.audio.load();

    this._trackLoaded = true;

    this._setTrackTitle(this._currentTrack, this._elements.playListRows);

    this._setActiveItem(this._currentTrack, this._elements.playListRows);

    this._elements.trackInfoBox.style.visibility = "visible";

    this._playBack();
  }

  _setActiveItem(currentTrack, playListRows) {
    for (var i = 0; i < playListRows.length; i++) {
      playListRows[i].children[2].className = "track-title";
    }

    playListRows[currentTrack - 1].children[2].className = "track-title active-track";
  };

  _setTrackTitle(currentTrack, playListRows) {
    var trackTitleBox = document.querySelector(".player .info-box .track-info-box .track-title-text");
    var trackTitle = playListRows[currentTrack - 1].children[2].outerText;

    trackTitleBox.innerHTML = null;

    trackTitleBox.innerHTML = trackTitle;

    document.title = trackTitle;
  };

  _trackHasEnded() {
    parseInt(this._currentTrack);
    this._currentTrack = (this._currentTrack === this._elements.playListRows.length) ? 1 : this._currentTrack + 1;
    this._trackLoaded = false;

    this._resetPlayStatus();

    this._setTrack();
  };

  _trackTimeChanged() {
    console.log('this._elements.audio _trackTimeChanged', this._elements.audio);
    var currentTimeBox = document.querySelector(".player .info-box .track-info-box .audio-time .current-time");
    var currentTime = this._elements.audio.currentTime;
    var duration = this._elements.audio.duration;
    var durationBox = document.querySelector(".player .info-box .track-info-box .audio-time .duration");
    var trackCurrentTime = this._trackTime(currentTime);
    var trackDuration = this._trackTime(duration);

    currentTimeBox.innerHTML = null;
    currentTimeBox.innerHTML = trackCurrentTime;

    durationBox.innerHTML = null;
    durationBox.innerHTML = trackDuration;

    this._updateProgressIndicator();
    this._bufferProgress(this._elements.audio);
  };

  _trackTime(seconds) {
    let min = 0;
    let sec = Math.floor(seconds);

    min = Math.floor(sec / 60);

    const minString = min >= 10 ? min : '0' + min;
    sec = Math.floor(sec % 60);

    const secString = sec >= 10 ? sec : '0' + sec;

    const timeString = minString + ':' + secString;

    return timeString;
  };

  _updatePlayStatus(audioPlaying) {
    if (audioPlaying) {
      this._elements.playerButtons.largeToggleBtn.children[0].className = "large-pause-btn";

      this._elements.playerButtons.smallToggleBtn[this._currentTrack - 1].children[0].className = "small-pause-btn";
    } else {
      this._elements.playerButtons.largeToggleBtn.children[0].className = "large-play-btn";

      this._elements.playerButtons.smallToggleBtn[this._currentTrack - 1].children[0].className = "small-play-btn";
    }

    //Update next and previous buttons accordingly
    if (this._currentTrack === 1) {
      this._elements.playerButtons.previousTrackBtn.disabled = true;
      this._elements.playerButtons.previousTrackBtn.className = "previous-track-btn disabled";
    } else if (this._currentTrack > 1 && this._currentTrack !== this._elements.playListRows.length) {
      this._elements.playerButtons.previousTrackBtn.disabled = false;
      this._elements.playerButtons.previousTrackBtn.className = "previous-track-btn";
      this._elements.playerButtons.nextTrackBtn.disabled = false;
      this._elements.playerButtons.nextTrackBtn.className = "next-track-btn";
    } else if (this._currentTrack === this._elements.playListRows.length) {
      this._elements.playerButtons.nextTrackBtn.disabled = true;
      this._elements.playerButtons.nextTrackBtn.className = "next-track-btn disabled";
    }
  };

  _updateProgressIndicator() {
    var currentTime = parseFloat(this._elements.audio.currentTime);
    var duration = parseFloat(this._elements.audio.duration);
    var indicatorLocation = 0;
    var progressBarWidth = parseFloat(this._elements.progressBar.offsetWidth);
    var progressIndicatorWidth = parseFloat(this._progressBarIndicator.offsetWidth);
    var progressBarIndicatorWidth = progressBarWidth - progressIndicatorWidth;

    indicatorLocation = progressBarIndicatorWidth * (currentTime / duration);

    this._progressBarIndicator.style.left = indicatorLocation + "px";
  };

  _resetPlayStatus() {
    var smallToggleBtn = this._elements.playerButtons.smallToggleBtn;

    this._elements.playerButtons.largeToggleBtn.children[0].className = "large-play-btn";

    for (var i = 0; i < smallToggleBtn.length; i++) {
      if (smallToggleBtn[i].children[0].className === "small-pause-btn") {
        smallToggleBtn[i].children[0].className = "small-play-btn";
      }
    }
  };
}
