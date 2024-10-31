const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    AuthorId: {
      type: String,
      required: true
    },
    nameEvent: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    message: {            
      type: String,
      trim: true,
      maxlength: 500,
    },
    
    picture: {
      type: String,                                  
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likers: {
      type: [String],
      default: []
      
    },
    participants: {
      type: [String],
      default: []
      
    },
    comments: {
      type: [
        {
          commenterId:String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      default: [],
    },
    
  },
 
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('event', eventSchema);