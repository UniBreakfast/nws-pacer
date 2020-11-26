const check = require('../access/user')

exports.get = exports.post = {
  access: 'guest',
  handler: async (props) => ({session: !! await check(props)})
}
