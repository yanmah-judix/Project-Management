const express=require('express');
const router=express.Router();
const Project=require('../models/Project');
const Task=require('../models/Task');
const auth=require('../middlewares/authMiddleware');

router.post('/', auth, async (req,res)=>{
    const {name,description}=req.body;
    try{
        const project=await Project.create({
            name,
            description,
            user:req.user.id
        })
        res.status(201).json(project);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
});

router.get('/',auth, async (req,res)=>{
    try{
        const projects=await Project.find({user:req.user.id});
        res.status(200).json(projects);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
})

router.get('/:projectId', auth, async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId)   
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const tasks = await Task.find({ project: projectId });
    res.json({
      ...project.toObject(),
      tasks
    });
  } 
  catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports=router;

