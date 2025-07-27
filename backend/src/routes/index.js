const {Router} = require('express');
const userRouter = require('./user.routes');
const postmanRouter = require('./postman.routes');
const parcelRouter = require('./parcel.routes');
const adminRouter = require('./admin.routes');
const notificationRouter = require('./notification.routes');
const failedDeliveryRouter = require('./failedDelivery.routes');
const feedbackRouter = require('./feedback.routes');
const addressRouter = require('./address.routes');
const attnedanceRouter = require('./attendance.routes');
const predictionRouter = require('./prediction.routes');
const complaintsRouter = require('./complaints.routes');

const otpRouter= require('./otp.routes')

const router = Router();

router.get('/', (req, res) => {
    res.json({message: 'Welcome to the API'});
});

router.use('/user', userRouter);
router.use('/postman', postmanRouter);
router.use('/otp', otpRouter);
router.use('/parcel', parcelRouter);
router.use('/admin', adminRouter);
router.use('/notification', notificationRouter);
router.use('/faileddelivery', failedDeliveryRouter);
router.use('/feedback', feedbackRouter);
router.use('/address', addressRouter);
router.use('/attend', attnedanceRouter);
router.use('/predict', predictionRouter);
router.use('/complaint', complaintsRouter);

module.exports = router;