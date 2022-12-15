import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayer3Component } from './audio-player3.component';

describe('AudioPlayer3Component', () => {
  let component: AudioPlayer3Component;
  let fixture: ComponentFixture<AudioPlayer3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioPlayer3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
