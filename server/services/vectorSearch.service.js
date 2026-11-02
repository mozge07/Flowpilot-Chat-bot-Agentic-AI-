import FAQ from "../models/faq.model.js";

export async function searchSimilarFaqs(queryEmbedding) {
  const results = await FAQ.aggregate([
    {
      $vectorSearch: {
        index: "faq_vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 3,
      },
    },
    {
      $project: {
        question: 1,
        answer: 1,
        category: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  return results;
}
