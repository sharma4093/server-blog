import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    BlogName: {
      type: String,
      required: true,
    },
    content:{
      type:String,
    },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
      default: 'ACTIVE'
    }
  }, { timestamps: true });

export const blogModel = new mongoose.model('blogSchema', blogSchema);
