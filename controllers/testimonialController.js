
import Testimonial from '../models/Testimonial.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private
const createTestimonial = async (req, res) => {
    const { name, role, feedback, rating } = req.body;
    const imageUrl = req.file ? `/${req.file.path.replace(/\\/g, "/")}` : '';

    try {
        const testimonial = new Testimonial({
            name,
            role,
            feedback,
            rating,
            imageUrl
        });

        const createdTestimonial = await testimonial.save();
        res.status(201).json(createdTestimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
const updateTestimonial = async (req, res) => {
    const { name, role, feedback, rating } = req.body;
    
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (testimonial) {
            testimonial.name = name || testimonial.name;
            testimonial.role = role || testimonial.role;
            testimonial.feedback = feedback || testimonial.feedback;
            testimonial.rating = rating || testimonial.rating;
            
            if (req.file) {
                testimonial.imageUrl = `/${req.file.path.replace(/\\/g, "/")}`;
            }

            const updatedTestimonial = await testimonial.save();
            res.json(updatedTestimonial);
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            await testimonial.deleteOne();
            res.json({ message: 'Testimonial removed' });
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
