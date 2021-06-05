const { Op, Sequelize } = require("sequelize");
const {Movie, Actor}  = require('../models/index');

module.exports = {

  getMovies :  async(req, res, next) => {
    const query = req.query
    const params = req.params
    const { id } = req.params
    const { sort, filter } = req.query
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


}
