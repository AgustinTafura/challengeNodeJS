const { Op, Sequelize } = require("sequelize");
const {Movie, Actor, Director, Genre}  = require('../models/index');

module.exports = {

  getMovies :  async(req, res, next) => {
    const query = req.query
    const params = req.params
    // const {  } = req.params
    const { id,sort, filter } = req.query
    const whereStatement = {};


    if(filter !== undefined && filter.awards) {whereStatement.awards = filter.awards}
    if(id !== undefined){ whereStatement.id = id}



    try {
      const movies = await Movie.findAll({
        where: whereStatement,
        order: sort && sort.title?Object.entries(sort):[],
        include: {all: true},
      })
      return res.status(201).render('movies',{
        movies, query, params
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({errors: error.message})
    }
  },

  getActors :  async(req, res, next) => {

    const { id } = req.params
    const whereStatement = {};

    if(id !== undefined){ whereStatement.id = id}

    try {
      const actors = await Actor.findAll({
        where: whereStatement,
        order: [['lastName', "ASC"]],
        include: {all: true},
      })
      return res.status(201).render('actors',{actors:actors});

    } catch (error) {
      console.log(error)
      return res.status(500).json({errors: error.message})
    }
  },

  getDirectors :  async(req, res, next) => {

    const { id } = req.params
    const whereStatement = {};

    if(id !== undefined){ whereStatement.id = id}

    try {
      const directors = await Actor.findAll({
        where: whereStatement,
        order: [['lastName', "ASC"]],
        include: {all: true},
      })
      return res.status(201).render('directors',{directors:directors});

    } catch (error) {
      console.log(error)
      return res.status(500).json({errors: error.message})
    }
  },

  createMovie : async(req, res) => {
    var directors = await Director.findAll({
      order: [['lastName', "ASC"]],
    })

    var genres = await Genre.findAll({
      order: [['name', "ASC"]],
    })

    directors =! undefined && res.render('createMovie', {directors, genres})
  },


  storeMovie : async(req, res) => {
    var {title, awards, releaseDate, length, genreId, directorId, firstName, lastName }  = req.body

    if (!directorId){
      const newDirector = await Director.create({ firstName, lastName });
      const newDirectorId = newDirector.dataValues.id
      console.log('entro', newDirectorId)
      directorId = newDirectorId
    }


    await Movie.create({title, awards, releaseDate, length, genreId, directorId})
    .then((newMovie)=>{
      const newMovieId = newMovie.dataValues.id
      
      console.log('pelocula creada')

      res.redirect(`/movies?id=${newMovieId}`)

    }).catch((err)=>{
      console.log('error aqui',  err)
      res.redirect('back')
    })

  } 

}
