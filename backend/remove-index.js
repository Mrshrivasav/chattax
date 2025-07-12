import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const removeIndex = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get the users collection
    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");

    // List all indexes
    const indexes = await usersCollection.indexes();
    console.log("Current indexes:", indexes);

    // Remove the username_1 index if it exists
    try {
      await usersCollection.dropIndex("username_1");
      console.log("Successfully removed username_1 index");
    } catch (error) {
      if (error.code === 26) {
        console.log("Index username_1 does not exist");
      } else {
        console.log("Error removing index:", error.message);
      }
    }

    // List indexes again to confirm
    const updatedIndexes = await usersCollection.indexes();
    console.log("Updated indexes:", updatedIndexes);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

removeIndex(); 