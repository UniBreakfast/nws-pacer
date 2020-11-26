exports.get = exports.post = {
  access: 'user',
  handler: ({db}) => db.collection('users').find().toArray()
}
