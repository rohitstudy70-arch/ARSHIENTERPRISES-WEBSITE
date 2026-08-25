/**
 * Product Controller
 * Handles product CRUD operations
 */

const Product = require('../models/Product');
const Category = require('../models/Category');
const { AppError, asyncHandler } = require('../middleware/errorHandler');
const { generateSlug, paginate, filterProducts } = require('../utils/helpers');

/**
 * Get all products with pagination and filtering
 */
exports.getAllProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 12, category, search, sort, includeInactive } = req.query;

    const filter = {};
    if (includeInactive !== 'true') {
        filter.isActive = true;
    }

    if (category) {
        filter.category = category;
    }

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { shortDescription: { $regex: search, $options: 'i' } },
        ];
    }

    const sortOption = sort === 'newest' ? { createdAt: -1 } : { createdAt: -1 };

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .populate('category', 'name slug')
        .sort(sortOption)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    res.status(200).json({
        success: true,
        data: products,
        pagination: {
            currentPage: parseInt(page),
            pageSize: parseInt(limit),
            totalItems: totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
        },
    });
});

/**
 * Get product by slug
 */
exports.getProductBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const product = await Product.findOne({ slug, isActive: true }).populate(
        'category'
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.status(200).json({
        success: true,
        data: product,
    });
});

/**
 * Get product by ID
 */
exports.getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).populate('category');

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }

    res.status(200).json({
        success: true,
        data: product,
    });
});

/**
 * Get featured products
 */
exports.getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({
        isActive: true,
        isFeatured: true,
    })
        .populate('category', 'name slug')
        .limit(8)
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: products,
    });
});

/**
 * Get related products
 */
exports.getRelatedProducts = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }

    const relatedProducts = await Product.find({
        _id: { $ne: productId },
        category: product.category,
        isActive: true,
    })
        .limit(4)
        .populate('category');

    res.status(200).json({
        success: true,
        data: relatedProducts,
    });
});

/**
 * Create product (Admin)
 */
exports.createProduct = asyncHandler(async (req, res) => {
    const { title, category, ...rest } = req.validatedData;

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
        return res.status(404).json({
            success: false,
            message: 'Category not found',
        });
    }

    const slug = generateSlug(title);

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
        return res.status(400).json({
            success: false,
            message: 'A product with this title already exists',
        });
    }

    const product = await Product.create({
        title,
        slug,
        category,
        ...rest,
    });

    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
    });
});

/**
 * Update product (Admin)
 */
exports.updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, category, ...rest } = req.body;

    let product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }

    // Verify category if provided
    if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
    }

    // Update slug if title changed
    let slug = product.slug;
    if (title && title !== product.title) {
        slug = generateSlug(title);
        const duplicateSlug = await Product.findOne({
            slug,
            _id: { $ne: id },
        });

        if (duplicateSlug) {
            return res.status(400).json({
                success: false,
                message: 'A product with this title already exists',
            });
        }
    }

    product = await Product.findByIdAndUpdate(
        id,
        {
            title,
            slug,
            category,
            ...rest,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product,
    });
});

/**
 * Delete product (Admin)
 */
exports.deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
    });
});

/**
 * Get product statistics (Admin)
 */
exports.getProductStats = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    const lowStockProducts = await Product.countDocuments({
        stockQuantity: { $lt: 5 },
    });

    res.status(200).json({
        success: true,
        data: {
            totalProducts,
            activeProducts,
            featuredProducts,
            lowStockProducts,
        },
    });
});
