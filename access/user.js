module.exports = async ({request, response, users}) => {
  const {token} = request.cookie
  if (!token) return

  const user = await users.findOne({token})
  if (!user) return response.delCookie('token')

  response.setCookie('token', token)
  users.findOneAndUpdate({login: user.login}, {$set: {checked: new Date}})
  return user
}
