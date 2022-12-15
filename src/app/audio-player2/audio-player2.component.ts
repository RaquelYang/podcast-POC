import { logging } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AudioPlayer2Service } from './audio-player2.service';

@Component({
  selector: 'app-audio-player2',
  templateUrl: './audio-player2.component.html',
  styleUrls: ['./audio-player2.component.scss']
})
export class AudioPlayer2Component {
  audio = new Audio();
  audioSources: string[];
  playList: string[];

  currentTrack = null;
  trackLoaded = false;
  index = 0;

  constructor(private audioPlayer2Service: AudioPlayer2Service) {
    this.audio.addEventListener("ended", (e) => {
      this.trackHasEnded();
    }, false);
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.audioSources = this.audioPlayer2Service.audioSource();
    this.playList = this.audioPlayer2Service.playList();
    this.currentTrack = this.audioSources[0];
  }

  selectedTrack(event,trackIndex: number): void {
    event.preventDefault();
    const selectedTrack = trackIndex;
    console.log('audio', this.audio) ;
  }

  playSound() {
    console.log('playSound');
    this.audio.src = this.currentTrack;
    this.audio.load();
    this.audio.play();
  }

  trackHasEnded() {
    this.index++
    this.currentTrack = this.audioSources[this.index];
    this.playSound();

  }


}
