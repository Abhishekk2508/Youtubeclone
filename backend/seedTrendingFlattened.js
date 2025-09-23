const mongoose = require("mongoose");
const VideoDataModel = require("./Models/videos"); // adjust path if needed
require("dotenv").config();

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // clear old data
    await VideoDataModel.deleteMany({});

    await VideoDataModel.create({
      email: "dummyuser@example.com",
      VideoData: [
        {
          thumbnailURL: "https://img.youtube.com/vi/abc123/maxresdefault.jpg",
          uploader: "Channel One",
          videoURL: "https://www.youtube.com/watch?v=abc123",
          ChannelProfile: "https://example.com/channel1.jpg",
          Title: "My First Video",
          Description: "Demo description",
          Tags: "demo,video",
          videoLength: 120,
          uploaded_date: "2025-09-22",
        },
        {
          thumbnailURL: "https://img.youtube.com/vi/xyz456/maxresdefault.jpg",
          uploader: "Channel Two",
          videoURL: "https://www.youtube.com/watch?v=xyz456",
          ChannelProfile: "https://example.com/channel2.jpg",
          Title: "My Second Video",
          Description: "Another demo video",
          Tags: "sample,video",
          videoLength: 95,
          uploaded_date: "2025-09-22",
        },
      ],
    });

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();
