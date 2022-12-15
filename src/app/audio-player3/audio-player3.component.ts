import { Component, OnInit } from '@angular/core';
import { AudioPlayer3Service, StreamState } from './audio-player3.service';

@Component({
  selector: 'app-audio-player3',
  templateUrl: './audio-player3.component.html',
  styleUrls: ['./audio-player3.component.scss']
})
export class AudioPlayer3Component {

  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};

  constructor(private audioPlayer3Service: AudioPlayer3Service){
    this.files = this.audioPlayer3Service.files;
    this.audioPlayer3Service.getState().subscribe(state => {
      this.state = state
    })
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  playStream(url) {
    this.audioPlayer3Service.playStream(url).subscribe(events => {
      // listening for fun here
      if (events.type === 'ended') {
        this.next();
      }
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioPlayer3Service.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioPlayer3Service.pause();
  }

  play() {
    this.audioPlayer3Service.play();
  }

  stop() {
    this.audioPlayer3Service.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  onSliderChangeEnd(change) {
    this.audioPlayer3Service.seekTo(change.value);
  }


}
