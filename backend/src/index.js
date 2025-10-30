const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Message = require("./models/Message");
const messagesRouter = require("./routes/messages");
const liveEventsRouter = require("./routes/liveEvents");
const galleryRouter = require("./routes/gallery");
const latestRouter = require("./routes/latest");
const projectsRouter = require("./routes/projects");
const connectToDatabase = require("./utils/db").connectToDatabase;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectToDatabase(process.env.MONGODB_URI);

async function start() {


  try {
    // Health check
    app.get("/api/health", (req, res) =>
      res.json({ status: "ok", db: "connected" })
    );
    // Contact route (keeps quick POST handler for contact form)
    app.post("/api/contact", async (req, res) => {
      try {
        const { name, message } = req.body || {};
        console.log("Received contact POST:", { name, message });
        if (!name || !message)
          return res
            .status(400)
            .json({ result: "error", error: "Missing name or message" });
        const doc = new Message({ name, message });
        await doc.save();
        return res.json({ result: "success" });
      } catch (err) {
        console.error("Error saving contact message", err);
        return res
          .status(500)
          .json({ result: "error", error: "Internal server error" });
      }
    });

    // Messages router (list/create/get/delete)
    app.use("/api/messages", messagesRouter);
    app.use("/api/live-events", liveEventsRouter);
    app.use("/api/gallery", galleryRouter);
    app.use("/api/latest", latestRouter);
    app.use("/api/projects", projectsRouter);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server - unable to connect to MongoDB", err);
    process.exit(1);
  }
}

start();
