const mongoose = require("mongoose")

const connectTodb = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log("database connected");
	}
	catch (error) {
		console.error(error);
	}

}

module.exports = connectTodb