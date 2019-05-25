const { parse } = require('../../lib/cli')

test('parse gives me an object with flags and args separated', () => {
  const unparsedArguments = ['three', 'two', '--one']
  const { flags, args } = parse(unparsedArguments)
  expect(args).toEqual(['three', 'two'])
  expect(flags).toEqual(['--one'])
})
