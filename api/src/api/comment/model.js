import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number
  },
  content: {
    type: String
  },
  poi: {
    type: Schema.Types.ObjectId,
    ref: 'Poi'
  },
  photos: [{
    type: String
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

commentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      rating: this.rating,
      content: this.content,
      poi: this.poi,
      photos: this.photos,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Comment', commentSchema)

export const schema = model.schema
export default model
