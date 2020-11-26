exports.get = exports.post = {
  access: 'guest',
  handler: async ({request: {query: {login}}, db}) =>
    ({vacant: ! await db.collection('users').findOne({login})})
}
