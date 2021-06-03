const jwt = require('jsonwebtoken');

module.exports = {

  generateAccessToken(userId) {
    console.log(typeof process.env.SECRET_TOKEN)

    const token = jwt.sign({userId},process.env.SECRET_TOKEN , { expiresIn: '24h' })

    return token
  },

  authenticateToken(req, res, next) {
    const authCookie = req.cookies['jwt']
    const token = authCookie && authCookie.split('.')[1]

    if (token == null) return res.sendStatus(401)
  
    jwt.verify(authCookie , process.env.SECRET_TOKEN, (err, user) => {
      
      console.log(err)
      if (err) return res.sendStatus(403)

      req.user = user
  
      next()
    })
  },
  

}
