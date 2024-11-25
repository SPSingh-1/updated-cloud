const mongoose = require('mongoose')
// import mongoose from 'mongoose';
// const { Schema } = mongoose;

const UserSchema = new Schema({
  title:{
    type:string,
    required:true,
  },
  description:{
    type:string,
    required:true
  },
  tag:{
    type:string,
    default:"General"
  },
  Date:{
    type:date,
    default:date.now
  }
});

module.exports=mongoose.model('notes',NotesSchema)

