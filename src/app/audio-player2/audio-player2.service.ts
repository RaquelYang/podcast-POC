import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayer2Service {

  constructor() { }

  audioSource(): string[] {
    return ['https://archive.org/download/calexico2006-12-02..flac16/calexico2006-12-02d1t02.mp3', 'https://archive.org/download/ra2007-07-21/ra2007-07-21d1t05_64kb.mp3', 'https://archive.org/download/slac2002-02-15/slac2002-02-15d1t07_64kb.mp3', 'https://archive.org/download/blitzentrapper2009-02-24.flac16/blitzentrapper2009-02-24t02_64kb.mp3', 'https://archive.org/download/samples2003-11-21.flac16/samples2003-11-21d2t04.mp3', 'https://archive.org/download/mikedoughty2004-06-16.flac16/d1t13.mp3', 'https://archive.org/download/glove2004-03-18.shnf/glove2004-03-18d1t05.mp3', 'https://archive.org/download/guster2005-11-12.flac16/guster2005-11-12d2t04.mp3', 'https://archive.org/download/oar2004-11-12.flac/oar2004-11-12d1t01.mp3', 'https://archive.org/download/mmj2003-09-26.shnf/mmj2003-09-26d2t08.mp3']
  }

  playList(): string[] {
    return ['Calexico - Across The Wire', 'Ryan Adams &amp; The Cardinals - Cold Roses', 'The Slackers - Married Girl', 'Blitzen Trapper - Saturday Night', 'The Samples - Feel Us Shaking', 'Mike Doughty - American Car', 'G. Love &amp; Special Sauce - Dreamin', 'Guster - Amsterdam', 'O.A.R. - About Mr. Brown', 'My Morning Jacket - Phone Went West']
  }
}
