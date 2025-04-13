const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
});
  
module.exports=mongoose.model("User", userSchema);
  