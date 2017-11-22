const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');


const db = "mongodb://admin:admin@ds149934.mlab.com:49934/thoughtnextbotdb"

mongoose.Promise = global.Promise;
 mongoose.connect(db, function(err){
   if(err){
     console.log("error!"+ err);
   }
   console.log("successfully connected to mongodb");
 });

router.get('/videos', function(req,res){
  console.log('Get request for all videos');
  Video.find({})
  .exec(function(err,videos){
    if(err){
      console.log('Error retrieving videos')
    }
    else {
      res.json(videos)
    }
  })
});

router.get('/video/:id', function(req,res){
  console.log('Get request for singal videos');
  Video.findById(req.parms.id)
  .exec(function(err,videos){
    if(err){
      console.log('Error retrieving videos')
    }
    else {
      res.json(video)
    }
  })
});

router.post('/video', function(req, res){
    console.log('Post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo){
        if (err){
            console.log('Error saving video');
        }else{
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id', function(req,res){
  console.log('update a video');
Video.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, updatedVideo){
    if(err){
      console.log('Error saving video')
    }
    else {
      res.json(updatedVideo)
    }
  })
});

router.delete('/video/:id', function(req,res){
  console.log('deleting a video');
Video.findByIdAndRemove({_id: req.params.id}, function(err, updatedVideo){
    if(err){
      console.log('Error saving video')
    }
    else {
      res.json(video)
    }
  })
});



module.exports = router;
