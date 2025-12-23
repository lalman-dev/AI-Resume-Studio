// controller for enhancing a resume's professional summary
//POST: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer specializing in crafting concise, compelling summaries. Your task is to transform the user's draft into a polished professional summary that is 1-2 sentences long. It must highlight the candidate's most relevant skills, experiences, and career objectives in a way that is clear, confident, and optimized for Applicant Tracking Systems (ATS). Avoid generic phrases, keep the tone professional, and return only the enhanced summary text without explanations, options, or formatting.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// controller for enhancing a resume's job description
//POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer specializing in crafting impactful job descriptions. Your task is to transform the user's draft into polished bullet points that clearly highlight responsibilities, achievements, and measurable impact. Each bullet must begin with a strong action verb, emphasize relevant skills, tools, and technologies, and quantify results wherever possible. Keep the language concise, professional, and optimized for Applicant Tracking Systems (ATS). Avoid generic phrases, repetition, or filler. Return only the enhanced job description bullet points without explanations, options, or formatting.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
