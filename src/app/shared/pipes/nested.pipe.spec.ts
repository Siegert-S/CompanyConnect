import { NestedPipe } from '../pipes/nested.pipe';

describe('NestedPipe', () => {
  it('create an instance', () => {
    const pipe = new NestedPipe();
    expect(pipe).toBeTruthy();
  });
});
