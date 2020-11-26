exports.get = exports.post = {
  access: 'user',
  handler: ({db}) => db.collection('users').find()
    .project({name: 1, login: 1, created: 1, modified: 1}).toArray()
}
