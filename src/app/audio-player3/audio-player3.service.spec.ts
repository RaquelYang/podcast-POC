import { TestBed } from '@angular/core/testing';

import { AudioPlayer3Service } from './audio-player3.service';

describe('AudioPlayer3Service', () => {
  let service: AudioPlayer3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioPlayer3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
