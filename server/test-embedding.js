import { generateEmbedding } from './services/embedding.service.js';

const text = "how can i rest my password?";

const embedding = await generateEmbedding(text);

console.log("embedding generate");
console.log("vector dimention: ", embedding.length);
console.log("first ten values: ", embedding.slice(0, 10));