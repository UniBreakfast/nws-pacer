loginForm.onsubmit = async () => {
  const user = fromEntries(new FormData(loginForm))
  const issues = await validate(user)
  if (issues.length) return issues.show()

  const request = {method: 'POST', body: stringify(user)}
  const response = await fetch('/api/login', request)
  const answer = await response.json()
  if (answer.success) return goTo('/', 'down')
  else new Issues(...answer.issues).show()
}


function validate(user) {
  const {login, password} = user
  const issues = new Issues

  if (!login) issues.require('login')
  else if (login.length>100)  issues.add('login',
    'would not be that long')

  if (!password) issues.require('password')

  return issues
}
