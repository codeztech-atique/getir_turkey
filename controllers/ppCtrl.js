const mongoose = require('mongoose');
const cryptoRandomString = require('crypto-random-string');
const chalk = require('chalk');

require('../models/todo');
const ttContent = mongoose.model('record');


exports.getAllInformation = (req, res, next) => {
  // console.log(chalk.bgYellowBright("---------------- Get All Submitted Information ----------------"));
  // console.log(req.body);

  // Pagination Concept

  let pageNo = 1;
  let pageSz = 10;
  if(req.body.pagination !== undefined) {
    pageNo = req.body.pagination.pageNumber === '' ? 1 : req.body.pagination.pageNumber;
    pageSz = req.body.pagination.pageSize === '' ? 10 : req.body.pagination.pageSize;
  } 
  
  let begin = 0, end = 0;
  if(pageNo === 0 || pageNo < 0) {
    pageNo = 1;
  } else if(pageNo > 0) { 
    begin = ((pageNo - 1) * pageSz);
    end = pageSz;
  }
  
  // Filtering data based on request body
  var startDate = new Date(req.body.startDate);
  var endDate = new Date(req.body.endDate);
  var minCount = req.body.minCount;
  var maxCount = req.body.maxCount;

  ttContent.find({createdAt: {$gte: startDate, $lte: endDate}}, async( err, resp) => {
    if (Object.keys(resp).length) {
      var filterObj = [];
      resp.forEach((e) => {
        // Count Calculation
        let totalRs = 0;
        for(let i=0;i<e.counts.length;i++) {
          totalRs+=e.counts[i];
        }
        if(totalRs > minCount && totalRs < maxCount) {
          filterObj.push({
            key: e.key,
            createdAt: e.createdAt,
            totalCount: totalRs,
          });
        }
      });
      res.status(200).send({
        code: 0,
        msg: 'Success',
        records: filterObj
      });
    } else if(err) {
      res.status(400).send({
        message: 'Err !!!',
        result: err
      });
    } else {
      res.status(400).send({
        message: "Error",
        error: "Empty Store"
      });
    }
  }).skip(begin).limit(end);
};

exports.fetchOne = (req, res, next) => {
  // console.log(chalk.bgYellowBright("---------------- UrlShorter Information Submitted ----------------"));
  ttContent.find({key: req.params.id}, async( err, resp) => {
    if (Object.keys(resp).length) {
      var filterObj = [];
      resp.forEach((e) => {
        filterObj.push({
          key: e.key,
          count: e.count,
          createdAt: e.createdAt,
        });
      });
      res.status(200).send({
        code: 0,
        message: 'Success',
        data: filterObj
      });
    } else if(err) {
      res.status(400).send({
        message: 'Err !!!',
        result: err
      });
    } else {
      res.status(404).send({
        message: "Error",
        error: "Empty Store"
      });
    }
  });
};