const express = require("express")
const superHeroes = require("../superHeroes")
const {
  verifyHeroExist,
  verifySlugExist,
  verifyPowerExist,
  validateHero,
} = require("../middlewares/heroes")
const app = express()

// request to get all heroes
app.get("/", (req, res) => {
  res.json(superHeroes)
})

// request to post a new heroe
app.post("/", verifyHeroExist, validateHero, (req, res) => {
  const { slug, name, color, isAlive, age, image } = req.body
  const newSuperHero = {
    slug: slug,
    name: name,
    power: [],
    color: color,
    isAlive: isAlive,
    age: age,
    image: image,
  }
  superHeroes.push(newSuperHero)
  res.json(newSuperHero)
})

// request to get one heroe with dynamic url
app.get("/:slug", verifySlugExist, (req, res) => {
  res.json(req.hero)
})

// request to get all powers of one heroe with dynamic url
app.get("/:slug/powers", verifySlugExist, (req, res) => {
  res.json(req.hero.power)
})

// request to put a new power to one hero
app.put("/:slug/powers", verifySlugExist, (req, res) => {
  // on boucle sur power et on ajoute si il n'y a pas le meme pouvoir
  const { power } = req.body
  const superHero = superHeroes[req.heroId]
  const powerAlreadyExist = superHero.power.includes(power)
  if (powerAlreadyExist) {
    res.status(409).json("this power already exist for this hero")
  } else {
    superHero.power.push(power)
    res.json(superHero)
  }
})

// request to delete a hero by dynamic url
app.delete("/:slug", verifySlugExist, (req, res) => {
  superHeroes.splice(req.heroId, 1)
  res.json(`${req.hero.name} has been delete`)
})

// request to delete a power of one hero by dynamic url
app.delete(
  "/:slug/power/:power",
  verifySlugExist,
  verifyPowerExist,
  (req, res) => {
    superHeroes[req.heroId].power.splice(req.powerId, 1)
    res.json(`${req.power} has been delete`)
  }
)

// request to change all informations about one hero by dynamic url
app.put("/:slug", verifySlugExist, validateHero, (req, res) => {
  const { slug, name, color, power, isAlive, age, image } = req.body
  newInformationHero = {
    slug: slug,
    name: name,
    power: power,
    color: color,
    isAlive: isAlive,
    age: age,
    image: image,
  }
  superHeroes[req.heroId] = newInformationHero

  res.send(newInformationHero)
})

module.exports = app
