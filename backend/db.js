const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected to Atlas');

    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

    const foodItemsData = await foodItemsCollection.find({}).toArray();
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

       

    
    console.log("🌐 Global Data Set:", {
      food_items: foodItemsData.length,
      foodCategory: foodCategoryData.length})
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;

