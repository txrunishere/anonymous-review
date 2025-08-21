import mongoose from "mongoose";

export const connection = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    if (mongoose.connection.readyState === 2) return;

    const mongooseConnectionInstence = await mongoose.connect(
      process.env.MONGO_URI!,
      {
        dbName: "anonymous-message",
        bufferCommands: true,
      }
    );

    console.log(
      "Database Connected!!",
      mongooseConnectionInstence.connection.host,
      mongooseConnectionInstence.connection.name
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
