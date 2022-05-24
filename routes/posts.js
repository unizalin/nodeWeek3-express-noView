var express = require('express');
var router = express.Router();
const Post = require('../models/postModel')
/* GET posts page. */
router.get('/',async function(req, res, next) {
  const post = await Post.find()
  res.status(200).json({
    status: "success",
    post
  })
});

router.post('/',async function(req, res, next) {
  const newPost = await Post.create(req.body)
  res.status(200).json({
    status: "success",
    newPost
  })
});

router.delete('/',async function(req, res, next) {
  await Post.deleteMany({});
  res.status(200).json({
    status: "success",
    data: '全部已刪除'
  })
});

router.delete('/:id',async function(req, res, next) {
  const delPost = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
  })
});

router.patch('/:id',async function(req,res,next){
  const {userName,content,image,likes} = req.body 
  const data ={userName,content,image,likes}
  if(!data.content){
    res.status(400).json({
      status: "false",
      message: '內容不能為空'
    })
  }else{
    await Post.findByIdAndUpdate(req.params.id, data);
    const editPost = await Post.findById(req.params.id)
    if(!editPost){
      res.status(400).json({
        status: "false",
        message: '查無此ID，無法更新'
      })
    }else{
      res.status(200).json({
        status: "true",
        editPost
      })
    }
  }
})




module.exports = router;
