const express = require('express');
const router = express.Router();
const {
    createReview,
    getMyReviews,
    updateMyReview,
    deleteMyReview,
    getAllReviews,
    getReviewById,
    deleteReviewByAdmin
} = require('../controlers/review.controllers');
const adminProtect = require('../middleware/admin.middleware');
const userProtect = require('../middleware/auth.middleware');

// Menu routes for user
router.post('/createReview', userProtect, createReview);
router.get('/getMyReviews', userProtect, getMyReviews);
router.put('/updateMyReview/:id', userProtect, updateMyReview);
router.delete('/deleteMyReview/:id', userProtect, deleteMyReview);

// Menu routes for admin
router.get('/getAllReviews', adminProtect, getAllReviews);
router.get('/getReviewById/:id', adminProtect, getReviewById);
router.delete('/deleteReviewByAdmin/:id', adminProtect, deleteReviewByAdmin);

module.exports = router;
