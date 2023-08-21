const  express = require('express');
const AppoinmentModel = require('../Models/appointment.Model');
const appoinmentRouter = express.Router();

appoinmentRouter.get("/appointments",async(req,res)=>{
    try{
        let q = {};
        if(req.query)
        {
            if(req.query.filter)
            q.specialization = req.query.filter;
            
            if(req.query.sort)
            q.sort = {date :req.query.sort}
        }
        let data = await AppoinmentModel.find(q);
        if(req.query.search)
        {
            let filterData = data.filter((item)=>{
                if(item.name.split().includes(req.query.search))
                return true;
                else
                return false;
            });
            data = filterData;
        }
        console.log(data);
        res.status(200).json({message:"Data fectched", data:data});
    }
    catch(err)
    {
        res.send(err.message);
    }
});

appoinmentRouter.post("/appointments",async(req,res)=>{
    try{
        let obj = {...req.body};
        var now = require("date-now");
        obj.date = "2023-04-05T12:00:00.000Z";
        console.log(obj);
        const data  = await new AppoinmentModel(obj);
        await data.save();
        res.status(201).json({message:"Appoinment Added",data:data});
    }
    catch(err){
        console.log(err.message);
        res.send(err.message);
    }
});

appoinmentRouter.patch("/appointments/:id",async(req,res)=>{
    try{
        const obj = {...req.body};

        const data = await AppoinmentModel.findByIdAndUpdate(req.params.id,obj);
        res.status(202).json({message : "Appointment edited",data:data});
    }
    catch(err){
        res.send(err.message);
    }
});

appoinmentRouter.delete("/appointments/:id",async(req,res)=>{
    try{
        const data = await AppoinmentModel.findByIdAndDelete(req.params.id);
        res.status(203).json({message : "Appointment edited",data:data});
    }
    catch(err){
        res.send(err.message);
    }
});


module.exports = appoinmentRouter;