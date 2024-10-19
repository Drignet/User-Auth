const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email:{type:String, required:true, unique:true, lowercase:true},
    password:{type:String, required:true}
  },
  {
    timestamps:true
  }
  )
  
  
  userSchema.pre('save' , async function(next){
    if(this.isModified('password') || this.isNew){
      try{
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next()
      }catch(error){
        next(error)
      }
    }else{
      next()
    }
  })
  
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;