/* Created by avani on 17-06-2017. */
var express                 = require('express');
var router                  = express.Router();
var mongojs                 = require('mongojs');
var db                      = mongojs('mongodb://gudiya:1234@ds127962.mlab.com:27962/avani',['tasks']);  //collection

//get all tasks
router.get('/tasks', function (req,res,next) {
   // res.send('TASK API');
    db.tasks.find(function (err,tasks) {
       if(err)
        res.send(err);
       res.json(tasks);
    });
});

//get single task
router.get('/task/:id', function (req,res,next) {
    // res.send('TASK API');
    db.tasks.findOne({_id:mongojs.ObjectID(req.params.id)},function (err,task) {
        if(err)
            res.send(err);
        res.json(task);
    });
});

//save task
router.post('/task', function (req,res,next) {
  var task = req.body;
  if(!task.title || !(task.isDone + '')){
    res.status(400);
    res.json({"error" : "bad data.."});
  } else {
    db.tasks.save(task,function (err,task) {
      if(err)
        res.send(err);
      res.json(task);
    });
  }
});

//delete task
router.delete('/tasks/:id', function (req,res,next) {
    // res.send('TASK API');
    db.tasks.remove({_id:     mongojs.ObjectID(req.params.id)},function (err,task) {
        if(err)
            res.send(err);
        res.json(task);
    });
});

//update task
router.put('/tasks/:id', function (req,res,next) {
    var task                = req.body;
    var updTask             = {};

    if(task.isDone){
        updTask.isDone      = task.isDone;
    }    
    if(task.title){
        updTask.title       = task.title
    }
    
    if(!updTask) {
        res.status(400);
        res.json({"error":    "bad data."});
    } else {
        db.tasks.update({_id: mongojs.ObjectID(req.params.id)},updTask,{},function (err,task) {
        if(err)
            res.send(err);
        res.json(task);
        })
    }
});

module.exports              = router;