const parse = (args) => {
  const flags = []
  return { args: args.filter(arg => {
    const bool = arg.indexOf('--') === 0
    bool && flags.push(arg)
    return !bool
  }),
  flags }
}

exports.parse = parse
