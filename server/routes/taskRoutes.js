const express=require('express');
const router=express.Router();
const Project=require('../models/Project');
const Task=require('../models/Task');
const auth=require('../middlewares/authMiddleware');

router.post('/taskCreate/:projectId',auth,async (req,res)=>{
    try{
        const project=await Project.findOne({_id:req.params.projectId,user:req.user.id});
        if(!project) return res.status(404).json({message: 'Project not found'});

        const task= await Task.create({...req.body,project:project._id});
        res.status(201).json(task);

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.delete('/taskDel/:taskId',auth,async (req,res)=>{
    try{
        const task= await Task.findById(req.params.taskId).populate('project');
        if(!task)  return res.status(404).json({message:"Task not found"});
        if(task.project.user.toString()!==req.user.id)
            return res.status(403).json({message:"Unauthorized to delete this task"});
        await task.deleteOne();
        res.json({message:"Task delete successfully"});
    }
    catch(err){
       res.status(500).json({message:err.message});
    }
})

router.patch('/:taskId/done',auth,async (req,res)=>{
    try{
        const task= await Task.findById(req.params.taskId).populate('project');
        if(!task)  return res.status(404).json({message:"Task not found"});
        if(task.project.user.toString()!==req.user.id)
            return res.status(403).json({message:"Unauthorized to delete this task"});
        task.completed=true;
        await task.save();
        res.json(task);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }

});

module.exports=router;

