from flask import Flask, request, jsonify
import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

model = joblib.load('random_forest_model.joblib')
scaler = joblib.load('scaler.joblib')
label_encoder = joblib.load('label_encoder.joblib')

def safe_transform(label_encoder, column_values):
    transformed_values = []
    for value in column_values:
        try:
            transformed_values.append(label_encoder.transform([value])[0])
        except ValueError:
            transformed_values.append(-1) 
    return transformed_values

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    required_fields = ['name', 'age', 'married', 'working', 'past_deliveries']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    input_data = pd.DataFrame([data])

    input_data['name'] = safe_transform(label_encoder, input_data['name'])
    input_data['married'] = safe_transform(label_encoder, input_data['married'])
    input_data['working'] = safe_transform(label_encoder, input_data['working'])

    input_data[['age', 'past_deliveries']] = scaler.transform(input_data[['age', 'past_deliveries']])

    prediction = model.predict(input_data)

    predicted_delivery_time = label_encoder.inverse_transform(prediction)

    return jsonify({'predicted_delivery_time': predicted_delivery_time[0]})

if __name__ == '__main__':
    app.run(debug=True)
