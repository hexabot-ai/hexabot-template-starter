import type {
  ActionService,
  ConversationalWorkflowContext,
} from '@hexabot-ai/api';

import DummyAction from './dummy.action';

describe('DummyAction', () => {
  // The action registers itself with the ActionService; a stub is enough here.
  const action = new DummyAction({
    register: jest.fn(),
  } as unknown as ActionService);
  const context = {} as ConversationalWorkflowContext;

  it('greets the given name with the configured greeting', async () => {
    const output = await action.run({ name: 'Ada' }, context, {
      greeting: 'Hi',
    });

    expect(output).toEqual({
      text: 'Hi, Ada!',
      generatedAt: expect.any(String),
    });
  });

  it('applies the schema defaults', async () => {
    const output = await action.run({}, context, {});

    expect(output.text).toBe('Hello, Hexabot!');
  });
});
