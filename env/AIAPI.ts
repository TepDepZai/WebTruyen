const base = process.env.NEXT_PUBLIC_API_AI;
const AIAPI = {
  generateStory: `${base}/AIChatBot`,
  AISmooth: `${base}/AISmooth`,
};

export default AIAPI;
