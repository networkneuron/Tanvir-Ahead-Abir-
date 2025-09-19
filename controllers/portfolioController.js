
import Portfolio from '../models/Portfolio.js';

// @desc    Get all portfolio items with pagination
// @route   GET /api/portfolio
// @access  Public
const getPortfolioItems = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await Portfolio.countDocuments();
    const portfolioItems = await Portfolio.find({})
      .populate('serviceType', 'title category')
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({ portfolioItems, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a portfolio item
// @route   POST /api/portfolio
// @access  Private
const createPortfolioItem = async (req, res) => {
  const { title, description, serviceType, videoUrl } = req.body;
  const imageUrl = req.file ? `/${req.file.path.replace(/\\/g, "/")}` : '';

  if (!title || !description || !serviceType || !imageUrl) {
    return res.status(400).json({ message: 'Please provide all required fields and an image' });
  }

  try {
    const portfolioItem = new Portfolio({
      title,
      description,
      serviceType,
      imageUrl,
      videoUrl
    });

    const createdItem = await portfolioItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private
const updatePortfolioItem = async (req, res) => {
  const { title, description, serviceType, videoUrl } = req.body;

  try {
    const item = await Portfolio.findById(req.params.id);

    if (item) {
        item.title = title || item.title;
        item.description = description || item.description;
        item.serviceType = serviceType || item.serviceType;
        item.videoUrl = videoUrl || item.videoUrl;

        if (req.file) {
            item.imageUrl = `/${req.file.path.replace(/\\/g, "/")}`;
        }

        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404).json({ message: 'Portfolio item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private
const deletePortfolioItem = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.json({ message: 'Portfolio item removed' });
    } else {
      res.status(404).json({ message: 'Portfolio item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getPortfolioItems, createPortfolioItem, updatePortfolioItem, deletePortfolioItem };
