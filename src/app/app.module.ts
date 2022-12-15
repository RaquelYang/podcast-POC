import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PlyrModule } from 'ngx-plyr';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { AudioPlayer2Component } from './audio-player2/audio-player2.component';
import { AudioPlayer2Service } from './audio-player2/audio-player2.service';
import { AudioPlayer3Component } from './audio-player3/audio-player3.component';
import { AudioPlayer3Service } from './audio-player3/audio-player3.service';

@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent,
    AudioPlayer2Component,
    AudioPlayer3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlyrModule,
    NgxMaterialRatingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSliderModule

  ],
  providers: [AudioPlayer2Service, AudioPlayer3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
