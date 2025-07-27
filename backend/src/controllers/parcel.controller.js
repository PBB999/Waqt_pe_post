const { z } = require('zod');
const parcelService = require('../services/parcel.service');
const { sendOrderMessage, sendOtp } = require('../controllers/otp.controller');

const axios = require('axios');


const nodemailer = require('nodemailer');

const sendEmail = require('../utils/generateParcelNotificationEmail')


async function handleEmailSending(email, subject, text) {
    try {
        await sendEmail(email, subject, text);
        res.json({ message: 'Test email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error });
    }
}

async function sendWhatsAppMessage() {
    const resData = {
        status: false,
        answare: '',
    };

    try {
        const response = await axios.post(
            'https://graph.facebook.com/v21.0/545594535295251/messages',
            {
                messaging_product: 'whatsapp',
                to: 917972800561,
                type: 'template',
                template: {
                    name: 'hello_world',
                    language: {
                        code: 'en_US',
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        resData.status = true;
        resData.respondData = response.data;
    } catch (error) {
        resData.status = false;
        resData.answare = error.response ? error.response.data : error.message;
    }

    return resData;
}


const createParcelSchema = z.object({
    senderId: z.string(),
    receiverId: z.string().optional(),
    beneficiaryId: z.string().optional(),
    pickupAddress: z.string(),
    deliveryAddress: z.string(),
    status: z.enum(['Created', 'Picked Up', 'Out for Delivery', 'Delivered', 'Failed', 'Sorting']),
    timeSlot: z.object({
        startTime: z.string(),
        endTime: z.string(),
    }),
    packageDetails: z.object({
        selectedPackage: z.string().optional(),
        customPackage: z.string().optional(),
        selectedSize: z.string().optional(),
        dimensions: z.object({
            length: z.string().optional(),
            breadth: z.string().optional(),
            height: z.string().optional(),
        }).optional(),
        weight: z.string().optional(),
        selectedContent: z.string().optional(),
        customContent: z.string().optional(),
    }).optional(),
    deliveryType: z.string().optional(), 
    price: z.number().optional(), 
});


exports.createParcel = async (req, res) => {
    try {
        console.log("Hello from createParcel");
        const data = createParcelSchema.parse(req.body);
        console.log("data", data);

        const parcel = await parcelService.createParcel(data);
        const result = await sendWhatsAppMessage();

        const email = 'badgujarmanish999@gmail.com'; 
        const subject = 'Your Parcel Update'; 
        const text = 'This is a test email from our system.';

        await handleEmailSending(email, subject, text);


        res.status(201).json(parcel);
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: error.errors || error.message });
    }
};

const updateStatusSchema = z.object({
    status: z.enum(['Picked Up', 'Sorting', 'Out for Delivery', 'Delivered']),
});

const trackingSchema = z.object({
    status: z.enum(['Picked Up', 'Sorting', 'Out for Delivery', 'Delivered']),
    timestamp: z.date(),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }),
});


exports.getParcelById = async (req, res) => {
    try {
        console.log("Hello from getParcelById");
        const parcel = await parcelService.getParcelById(req.params.parcelId);
        console.log("parcel", parcel);
        res.status(200).json({ success: true, data: { parcel } });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getParcelsByPin = async (req, res) => {
    try {
        const parcels = await parcelService.getParcelByPin(req.params.pincode);
        res.status(200).json({ success: true, data: { parcels } });
    } catch (error) {
        console.log("error", error);
        res.status(404).json({ message: error.message });
    }
}

exports.getTodaysParcelsByPostmanId = async (req, res) => {
    try {
        const parcels = await parcelService.getTodaysParcelsByPostmanId(req.params.postmanId);
        res.status(200).json({ success: true, data: { parcels } });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getParcels = async (req, res) => {
    try {
        const parcels = await parcelService.getParcels();
        console.log("parcels", parcels);
        res.status(200).json({ success: true, data: { parcels } })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getParcelBySenderId = async (req, res) => {
    try {
        const parcel = await parcelService.getParcelBySenderId(req.params.senderId);
        res.status(200).json({ success: true, data: { parcel } });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getParcelByReceiverId = async (req, res) => {
    try {
        const parcel = await parcelService.getParcelByReceiverId(req.params.receiverId);
        res.status(200).json({ success: true, data: { parcel } });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateParcel = async (req, res) => {
    try {
        const updatedParcel = await parcelService.updateParcel(req.params.parcelId, req.body);
        res.status(200).json(updatedParcel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteParcel = async (req, res) => {
    try {
        await parcelService.deleteParcel(req.params.parcelId);
        res.status(200).json({ message: 'Parcel deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addTrackingHistory = async (req, res) => {
    try {
        const trackingData = trackingSchema.parse(req.body);
        const updatedParcel = await parcelService.addTrackingHistory(req.params.parcelId, trackingData);
        res.status(200).json(updatedParcel);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.updateParcelStatus = async (req, res) => {
    try {
        const data = updateStatusSchema.parse(req.body);
        const updatedParcel = await parcelService.updateParcelStatus(req.params.parcelId, data.status);
        res.status(200).json(updatedParcel);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

exports.addFeedback = async (req, res) => {
    try {
        const { rating, comments } = req.body;
        const updatedParcel = await parcelService.addFeedback(req.params.parcelId, { rating, comments });
        res.status(200).json(updatedParcel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};