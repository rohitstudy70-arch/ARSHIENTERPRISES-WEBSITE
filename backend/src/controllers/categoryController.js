/**
 * Category Controller
 * Handles product categories
 */

const Category = require('../models/Category');
const { asyncHandler } = require('../middleware/errorHandler');
const { generateSlug } = require('../utils/helpers');

/**
 * Get all categories
 */
exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true }).sort('order');

    res.status(200).json({
        success: true,
        data: categories,
    });
});

/**
 * Get category by slug
 */
exports.getCategoryBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const category = await Category.findOne({ slug, isActive: true });

    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found',
        });
    }

    res.status(200).json({
        success: true,
        data: category,
    });
});

/**
 * Create category (Admin)
 */
exports.createCategory = asyncHandler(async (req, res) => {
    const { name, ...rest } = req.body;

    const slug = generateSlug(name);

    const category = await Category.create({
        name,
        slug,
        ...rest,
    });

    res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category,
    });
});

/**
 * Update category (Admin)
 */
exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, ...rest } = req.body;

    let updateData = rest;

    if (name) {
        updateData.name = name;
        updateData.slug = generateSlug(name);
    }

    const category = await Category.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: category,
    });
});

/**
 * Delete category (Admin)
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
    });
});
