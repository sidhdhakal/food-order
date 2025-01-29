const Food = require('../models/Food')
const factory=require('./handlerFactory')


exports.createFood=factory.createOne(Food)