import dotenv from "dotenv";
import mongoose from "mongoose";
import FAQ from "../models/faq.model.js";
import { generateFaqEmbedding } from "../services/embedding.service.js";

dotenv.config();

async function backfillEmbeddings() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const faqs = await FAQ.find({
      $or: [
        { embedding: { $exists: false } },
        { embedding: { $size: 0 } },
      ],
    });

    console.log(`Found ${faqs.length} FAQs without embeddings`);

    for (const faq of faqs) {
      faq.embedding = await generateFaqEmbedding(faq);
      await faq.save();

      console.log(`Embedding generated: ${faq.question}`);
    }

    console.log("Backfill completed");
  } catch (error) {
    console.error("Backfill failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

backfillEmbeddings();