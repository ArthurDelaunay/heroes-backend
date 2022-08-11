const superHeroes = require("../superHeroes")

const verifyHeroExist = (req, res, next) => {
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

const verifySlugExist = (req, res, next) => {
  const alreadyExistHero = superHeroes.find((hero) => {
    return hero.slug === req.params.slug
  })
  const superHeroeExistIndex = superHeroes.findIndex((hero) => {
    return hero.slug === req.params.slug
  })
  if (alreadyExistHero) {
    req.hero = alreadyExistHero
    req.heroId = superHeroeExistIndex
    next()
  } else {
    res.status(404).json("this hero does not exist")
  }
}

const verifyPowerExist = (req, res, next) => {
  const alreadyExistPowerId = req.hero.power.findIndex((power) => {
    return power === req.params.power
  })
  if (alreadyExistPowerId > -1) {
    req.power = req.hero.power[alreadyExistPowerId]
    req.powerId = alreadyExistPowerId
    next()
  } else {
    res.status(404).json("this power does not exist")
  }
}

const validateHero = (req, res, next) => {
  const keysSort = Object.keys(req.body).sort()
  const keysSortRef = Object.keys(superHeroes[0]).sort()
  const isEqual = JSON.stringify(keysSort) === JSON.stringify(keysSortRef)
  console.log(keysSort, keysSortRef)
  console.log(isEqual)
  if (isEqual) {
    next()
  } else {
    res.status(400).json("bad request")
  }
}

module.exports = {
  verifyHeroExist: verifyHeroExist,
  verifySlugExist: verifySlugExist,
  verifyPowerExist: verifyPowerExist,
  validateHero: validateHero,
}
