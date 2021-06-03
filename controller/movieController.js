const { Op, Sequelize } = require("sequelize");
const {Movie}  = require('../models/index');

module.exports = {

  getMovies :  async(req, res, next) => {
    try {
      console.log(45454)
      const movies = await Movie.findAll({
        attributes: { exclude: ['id'] }
        // attributes: [],
        // include: [{all: true}],
      })
      return res.status(201).render('movies',{
        movies
      });
    } catch (error) {
      console.log('hay error')
      console.log(error)
      return res.status(500).json({errors: error.message})
    }
  },

}
