import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { AudioPlayer2Component } from './audio-player2/audio-player2.component';
import { AudioPlayer3Component } from './audio-player3/audio-player3.component';

const routes: Routes = [
  {
        path: 'audio-player',
        component: AudioPlayerComponent,
  },
  {
        path: 'audio-player2',
        component: AudioPlayer2Component,
  },
  {
        path: 'audio-player3',
        component: AudioPlayer3Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
