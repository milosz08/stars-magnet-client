import { OnlyFirstPipe } from './only-first.pipe';

describe('OnlyFirstPipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyFirstPipe();
    expect(pipe).toBeTruthy();
  });
});
