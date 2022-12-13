import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import * as Plyr from 'plyr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // material rating
  ratings: Rating[] = [
    {
      value: 1,
      max: 10,
      color: "primary"
    },
    {
      value: 2,
      max: 5,
      color: "accent"
    },
    {
      value: 3,
      max: 10,
      color: "warn"
    },
    {
      value: 4,
      max: 5
    },
    {
      value: 5,
      max: 10,
      disabled: true
    },
    {
      value: 1,
      max: 5,
      color: "primary",
      dense: true
    },
    {
      value: 2,
      max: 5,
      color: "accent",
      readonly: true
    }
  ];

  player: Plyr;


  audioSources = [
    {
      src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
      type: 'audio/mp3'
    }
  ];

  audios: Plyr.SourceInfo[] = [
    {
      type: 'audio',
      sources: [
        {
          src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
        }
      ],
      title: 'sample1',
      poster: 'https://pic.pikbest.com/00/35/54/22n888piCVck.jpg-0.jpg!bw340'
    },
    {
      type: 'audio',
      sources: [
        {
          src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        }
      ],
      title: 'sample2',
      poster: 'https://static.displate.com/392x280/displate/2022-06-12/7f267c4556475f8daecb0a25e3947e00_22a9dfb6a5596a7d4b06a2369198f352.jpg'
    },
    {
      type: 'audio',
      sources: [
        {
          src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        }
      ],
      title: 'sample3',
      poster: 'https://media.posterlounge.com/images/big/1870175.jpg'
    },
  ]

  options: Plyr.Options = {
    speed: {
      selected: 1,
      options: [0.5, 1, 1.25, 1.5, 2],
    },
    // 單曲重複播放
    // loop: {
    //   active: true
    // }
  }

  constructor(){
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.player.source = this.audios[0];
    },500)

  }

  plyrInit(event: Plyr) {
    this.player = event;
  }

  play(): void {
    this.player.play();
  }

  pause(): void {
    this.player.pause();
  }

  moveTo(seconds: number): void {
    this.player.forward(seconds);
  }

  plyrEnded(event: Plyr.PlyrEvent) {
    const idx = this.audios.findIndex(audio => {
      // 這邊 this.player.source interface 設定的是 Plyr.SourceInfo 但 console 出來是個 string
      // workaround 的作法為將此 this.player.source 給一個 any 變數後再使用 findIndex 找出序列
      let sourceUrl: any
      sourceUrl = this.player.source;
      return audio.sources[0].src === sourceUrl;
    });
    // 如果 idx >= 現在 audios 長度那就不播放
    if (idx + 1 >= this.audios.length) {
      this.player.source = this.audios[0];
      this.player.stop();
    } else {
      this.player.source = this.audios[idx+1];
      this.player.play();
    }
  }

  changeVideoSource(audio: Plyr.SourceInfo) {
    this.player.source = audio;
    this.player.play();
  }
}


type Rating = {
  value: number;
  max: number;
  color?: ThemePalette;
  disabled?: boolean;
  dense?: boolean;
  readonly?: boolean;
};
