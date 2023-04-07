import express from 'express';

const router = express.Router();


router.use('/Users', require('./User').default);
router.use('/Auth', require('./Auth').default);
router.use('/Cart', require('./Cart').default);
router.use('/Products', require('./Products').default);
router.use('/ProductCategory', require('./ProductCategory').default);
router.use('/UserAddress', require('./UserAddress').default);
router.use('/Order', require('./Order').default);
router.use('/OrderItems', require('./OrderItems').default);
router.use('/CartItems', require('./CartItems').default);
router.use('/Payment', require('./Payment').default);

module.exports = router;