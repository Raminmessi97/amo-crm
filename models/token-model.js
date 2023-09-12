const {Schema,model} = require("mongoose");

const tokenModel = new Schema({
    referer:{type:String,required:true},
    access_token:{type:String,required:true},
    refresh_token:{type:String,required:true},
    expires_in:{type:String,required:false},
    token_type:{type:String,required:false},
})

module.exports = model("tokenmodel",tokenModel);