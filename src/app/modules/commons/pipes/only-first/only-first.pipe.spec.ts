/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * For check application license, check LICENSE file.
 */
import { OnlyFirstPipe } from './only-first.pipe';

describe('OnlyFirstPipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyFirstPipe();
    expect(pipe).toBeTruthy();
  });
});
