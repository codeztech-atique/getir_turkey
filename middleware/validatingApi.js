const chalk = require('chalk');

// Validate API
exports.validateAPI = (req, res, next) => {
    // console.log();
    // console.log(chalk.bgYellowBright("---------------- Validated API Data ----------------"));
    var error = '';
    if(req.body.startDate === undefined || req.body.startDate === '') {
        console.log(chalk.red('startDate is missing'));
        error += "startDate, "
    } if(req.body.endDate === undefined || req.body.endDate === '') {
      console.log(chalk.red('endDate no is missing'));
      error += "endDate no, "
    } if(req.body.minCount === undefined || req.body.minCount === '') {
      console.log(chalk.red('minCount no is missing'));
      error += "minCount no, "
    } if(req.body.maxCount === undefined || req.body.maxCount === '') {
      console.log(chalk.red('maxCount no is missing'));
      error += "maxCount no, "
    }
    if(error!=='') {
        res.status(400).send({
          status: 400,
          message: error + ' is required !!!'
        });
    } else {
      next();
    }
};

exports.fetchSingleDataValidateAPI = (req, res, next) => {
  // console.log();
    // console.log(chalk.bgYellowBright("---------------- Validated API Data ----------------"));
    // console.log();
    // console.log(req.body);
    // console.log();
    var error = '';
    var uniqueId = req.params.id;
    if(uniqueId === undefined || uniqueId === '') {
        console.log(chalk.red('id is missing'));
        error += "id, "
    }
    if(error!=='') {
        res.status(400).send({
          status: 400,
          message: error + ' is required !!!'
        })
    } else {
      next();
    }
}