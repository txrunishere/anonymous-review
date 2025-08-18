import mongoose from "mongoose";

let flag: boolean | null = null;

export const connection = async () => {
  if (flag) return;
  try {
    if (mongoose.connection.readyState === 2) {
      flag = true;
      return;
    }

    const mongooseConnectionInstence = await mongoose.connect(
      process.env.MONGO_URI!,
      {
        dbName: "anonymous-message",
        bufferCommands: true,
      }
    );

    if (mongooseConnectionInstence.connection.readyState === 1) {
      flag = true;
    }

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
