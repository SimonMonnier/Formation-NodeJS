//Importation des modules pour l'app
//express pour gérer les routes etc
const express = require('express')
//path pour gérer les chemins aux dossiers proprement
const path = require('path')
//Handlebars pour gérer le front (comme twig)
const exphbs = require('express-handlebars')
//fetch pour récupèrer des données d'une api
const fetch = require('node-fetch')
//Handlebars-helpers pour pour apporter des fonction 
//tel que mettre en majuscule la 1ere lettre d'une string
// eslint-disable-next-line no-unused-vars
const helpers = require('handlebars-helpers')(['string'])
//Body-parser afin afin d'envoyer des données depuis la page vers le serveur
const bodyParser = require('body-parser')

//Configuration du port d'écoute
const PORT = process.env.PORT || 5003
//Création de l'app
const app = express()

//High Order function (HOF) pour gérer les erreur plus rapidemnt (à coder)
//Prend en paramètre une fonction et retourne une fonction aussi
// ...args veut dire que si la fonction en paramètre a des arguments, on les prend tous
const catchErrors = asyncFunction => (...args) => asyncFunction(...args).catch(console.error)

//API pokeapi
//récupèration de tous les pokemons
const getAllPokemons = catchErrors( async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898')
    const json = await res.json()
    //console.table(json.results)
    return json 
})
//récupèration d'un pokemon
const getPokemon = catchErrors( async (pokemon = '1') => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const json = await res.json()
    return json 
})

//Middleware
//Rend le dossier public accessible de partout
app.use(express.static(path.join(__dirname, 'public')))
//Chargement du moteur de template
app.engine('.hbs', exphbs({extname: '.hbs'}))
//Choix du moteur de template à utiliser
app.set('view engine', '.hbs')
//Configuration de bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

//Création d'une route
app.get('/', catchErrors( async (req, res) => {
    const pokemons = await getAllPokemons()
    //console.log(pokemons.results[0])
    res.render('home', { pokemons })
}))

// app.post() sert à récupèrer les données envoyé depuis une page (ex:formulaire)
app.post('/search', (req, res) => {
    const search = req.body.search
    res.redirect(`/${search}`)
})

//Page not found
app.get('/notFound', (_, res) => res.render('notFound'))

//Création d'une route
app.get('/:pokemon', catchErrors( async (req, res) => {
    const search = req.params.pokemon
    const pokemon = await getPokemon(search)
    if (pokemon) {
        res.render('pokemon', { pokemon })
    } else {
        res.redirect('notFound')
    }
    
}))

//Démarrage du serveur en écoute sur le port paramétré
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
