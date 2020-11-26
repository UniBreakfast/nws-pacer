exports.any = {
  access: 'user',
  handler: ({response, grant: user, db}) => {
    db.collection('users').findOneAndUpdate(user, {$set: {modified: new Date},
      $unset: {token: ''}})
    response.delCookie('token')
    return {success: true}
  }
}
