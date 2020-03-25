const mongoose = require('mongoose')
const Schema = mongoose.Schema

const functionDB = new Schema(
    {
        name: {type: String, required: true},
        fx: { type: String, required: false },
        xl: { type: Number, required: false },
        xr: { type: Number, required: false },
        x:{type:Number,required:false},
        arrayx:{type:[Number],required:false},
        arrayy:{type:[Number],required:false},
        n:{type:Number,required:false},
        makex:{type:Number,required:false},
        requestx:{type:Number,required:false},
        matrixA:{type:[[Number]],required:false},
        matrixB:{type:[[Number]],required:false},
    },
    { timestamps: true },
)

module.exports = mongoose.model('functions', functionDB)