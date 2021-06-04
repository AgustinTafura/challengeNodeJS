const { Op, Sequelize } = require("sequelize");
const {Movie}  = require('../models/index');

module.exports = {

  getMovies :  async(req, res, next) => {
    const query = req.query
    const { sort, filter } = req.query

    console.log(sort, filter)


    try {
      const movies = await Movie.findAll({
        attributes: { exclude: ['id'] },
        order: sort && sort.title?Object.entries(sort):[],
        where: {
          [Op.and]: filter ==! undefined ? filter : {}
        }
        // attributes: [],
        // include: [{all: true}],
      })
      console.log('query', query)
      return res.status(201).render('movies',{
        movies, query
      });
    } catch (error) {
      console.log('hay error')
      console.log(error)
      return res.status(500).json({errors: error.message})
    }
  },

}
