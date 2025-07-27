const axios = require('axios');
const { getUserById } = require('./user.service');

const data = {
    name: 'Logan Mukhopadhyay',
    age: 33,
    married: 'Yes',
    working: 'Yes',
    past_deliveries: 5
};

exports.getPrediction = async (userId) => {
    try {
        const user = await getUserById(userId);
        console.log('User:', user);
        const response = await axios.post('http://127.0.0.1:5000/predict', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const predictedDeliveryTime = response.data.predicted_delivery_time;
        console.log('Predicted Delivery Time:', predictedDeliveryTime);
        const hours = convertTimeRangeToHours(predictedDeliveryTime);
        console.log('Duration in Hours:', hours);

        return { predictedDeliveryTime, hours };
    } catch (error) {
        console.error('Error making request to Python API:', error);
    }
}

function convertTimeRangeToHours(timeRange) {
    const [start, end] = timeRange.split('-').map(Number);
    return { start, end };
}