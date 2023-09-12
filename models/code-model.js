const {Schema,model} = require("mongoose");

const codeModel = new Schema({
    code:{type:String,required:false},
    referer:{type:String,required:false},
    platform:{type:Boolean,required:false},
    client_id:{type:String,required:false},
    from_widget:{type:String,required:false}
})

module.exports = model("code",codeModel);