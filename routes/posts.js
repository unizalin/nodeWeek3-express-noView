var express = require('express');
var router = express.Router();
const Post = require('../models/postModel')
/* GET posts page. */
router.get('/',async function(req, res, next) {
  try {
    const post = await Post.find()
    res.status(200).json({
      status: "success",
      post
    })
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error
    })  
  }
  
});

router.post('/',async function(req, res, next) {
  try {
    const { name, content, image, likes ,type,tags} = req.body;
    let dataPost = {name, content, image, likes ,type,tags};
    if (!dataPost.content || !dataPost.name) {
      res.status(400).json({
        status: "false",
        message: "使用這姓名以及內容不能為空"
      })
    } else {
      const newPost = await Post.create(dataPost);
      res.status(200).json({
        status: "true",
        newPost
      })
    }
  } catch (error) {
    res.status(400).json({
      status: "false",
      message: error
    })  
  }
  
});

router.delete('/',async function(req, res, next) {
  try {
    await Post.deleteMany({});
    res.status(200).json({
      status: "success",
      data: '全部已刪除'
    })
  } catch (error) {
    res.status(400).json({
      status: "false",
      error
    })
  }

});

router.delete('/:id',async function(req, res, next) {
  try {
    const postId = req.params.id
    const isPost = await Post.findById(postId).exec()
    if(!isPost){
      res.status(400).json({
        status: "false",
        message: '查無此ID，無法刪除'
      })
      return
    }
    const delPost = await Post.findByIdAndDelete(req.params.id);
    const posts = await Post.find()

    res.status(200).json({
      status: "success",
      posts
    })
  } catch (error) {
    res.status(400).json({
      status: "false",
      error
    })
  }
  
});

router.patch('/:id', async function(req,res,next){
  try {
    const postId = req.params.id
    const isPost = await Post.findById(postId).exec()
    if(!isPost){
      res.status(400).json({
        status: "false",
        message: '查無此ID，無法更新'
      })
      return
    }
      const {userName,content,image,likes} = req.body 
      const data ={userName,content,image,likes}
      if(!data.content){
        res.status(400).json({
          status: "false",
          message: '內容不能為空'
        })
      }else{
        await Post.findByIdAndUpdate(postId, data);
        const editPost = await Post.findById(req.params.id)

        res.status(200).json({
          status: "true",
          editPost
        })
      }
  } catch (error) {
    res.status(400).json({
      status: "false",
      error
    })
  }
})

module.exports = router;
