import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRManagement = () => {
	const trackingNumber = "BLRE24680135";
	const qrCodeLink = `http://10.1.50.29:8081/DeliveryDetails?tracking=${trackingNumber}`;

	return (
		<div className="container mx-auto p-6 max-w-md text-center">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="bg-red-800 text-white py-4">
					<h1 className="text-2xl font-bold">Parcel </h1>
				</div>

				<div className="p-6 flex justify-center">
					<QRCodeSVG value={qrCodeLink} size={250} level="H" includeMargin={true} />
				</div>

				<div className="bg-gray-100 p-4 text-center">
					<p className="text-sm text-gray-700">Scan QR Code to View Delivery Details</p>
				</div>
			</div>
		</div>
	);
};

export default QRManagement;
