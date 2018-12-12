// Project
import { onlyEmoji } from './utils';


describe('onlyEmoji', () => {
  it('should filter out non-emoji', () => {
    const input = 'a';
    const output = onlyEmoji(input);
    expect(output).toBe('');
  })
})



