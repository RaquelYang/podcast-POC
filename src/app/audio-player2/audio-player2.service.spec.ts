import { TestBed } from '@angular/core/testing';

import { AudioPlayer2Service } from './audio-player2.service';

describe('AudioPlayer2Service', () => {
  let service: AudioPlayer2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioPlayer2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
