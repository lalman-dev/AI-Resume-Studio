import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// Enhance professional summary
// POST: /api/ai/enhance-pro-sum
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
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("Error enhancing professional summary:", error);
    return res.status(500).json({ message: "Failed to enhance summary" });
  }
};

// Enhance job description
// POST: /api/ai/enhance-job-desc
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
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("Error enhancing job description:", error);
    return res
      .status(500)
      .json({ message: "Failed to enhance job description" });
  }
};

// Upload resume
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are an expert AI agent specializing in resume parsing and enhancement. Your task is to analyze raw resume text and return a strictly valid JSON object that conforms exactly to the provided schema. The output must be professional, concise, and recruiter-ready. Ensure each field is filled with accurate, well-structured information extracted from the resume text. Use clear, ATS-friendly language for summaries and descriptions, highlight measurable achievements where possible, and avoid generic or filler content. Do not include any explanations, options, or extra text — return only the JSON object that matches the schema.";

    const userPrompt = `Extract data from this resume: ${resumeText}
Provide the data strictly in the following JSON format with no additional text before or after:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;

    let parsedData;
    try {
      parsedData = JSON.parse(extractedData);
    } catch (err) {
      console.error("Invalid JSON from AI:", err);
      return res.status(400).json({ message: "Invalid JSON returned from AI" });
    }

    const newResume = await Resume.create({ userId, title, ...parsedData });
    return res.status(201).json({ resumeId: newResume._id });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return res.status(500).json({ message: "Failed to upload resume" });
  }
};
