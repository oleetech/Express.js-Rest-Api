const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  photo: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
