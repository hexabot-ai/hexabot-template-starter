import { HelloController } from './hello.controller';

describe('HelloController', () => {
  it('returns the greeting payload', () => {
    expect(new HelloController().check()).toEqual({ data: 'Hello World!' });
  });
});
