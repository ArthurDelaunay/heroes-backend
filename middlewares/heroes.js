const superHeroes = require("../superHeroes")

const verifyUser = (req, res, next) => {
  const { slug } = req.body
  const alreadyExistHero = superHeroes.find((hero) => {
    return hero.slug === slug
  })

  if (alreadyExistHero) {
    res.status(409).json("this hero does already exist")
  } else {
    next()
  }
}

module.exports = {
  verifyUser: verifyUser,
}
