// TodoModels.js

import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

let TodoModel;

try {
  // Check if the model is already registered
  TodoModel = mongoose.model('todoapp');
} catch (error) {
  // If not registered, define the model
  TodoModel = mongoose.model('todoapp', TodoSchema);
}

export default TodoModel;
