
import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // URL or path to the icon image
      required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Video Editing', 'Community Management', '2D Animation', 'Motion Graphics']
    }
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
