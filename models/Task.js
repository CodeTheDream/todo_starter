const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{type:String, required:true},
    completed:{type:Boolean, default:false}, 
    category:{type:String,  default: ""}
})
   
//export the extisting task or create one
module.exports = mongoose.models.Task|| mongoose.model('Task', TaskSchema);