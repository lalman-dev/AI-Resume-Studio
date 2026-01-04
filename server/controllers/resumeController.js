import fs from "fs";
import ImageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";

/* CREATE RESUME */
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const resume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/* DELETE RESUME */
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const deleted = await Resume.findOneAndDelete({
      _id: resumeId,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/* GET RESUME (PRIVATE) */
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/* GET RESUME (PUBLIC) */
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      public: true,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/* UPDATE RESUME (TEXT + IMAGE) */
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    let { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    if (!resumeId) {
      return res.status(400).json({ message: "resumeId is required" });
    }

    // Parse resumeData if sent as string (multipart/form-data)
    if (typeof resumeData === "string") {
      try {
        resumeData = JSON.parse(resumeData);
      } catch {
        return res.status(400).json({ message: "Invalid resumeData JSON" });
      }
    }

    let updatePayload = { ...resumeData };

    /* ---- TITLE UPDATE ---- */
    if (resumeData?.title) {
      updatePayload.title = resumeData.title;
    }

    /* ---- IMAGE UPLOAD ---- */
    if (image) {
      const stream = fs.createReadStream(image.path);

      const uploadResponse = await ImageKit.upload({
        file: stream,
        fileName: `resume-${resumeId}.png`,
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground === "true" ? ",e-bgremove" : ""),
        },
      });

      fs.unlinkSync(image.path);

      updatePayload.personal_info = {
        ...(updatePayload.personal_info || {}),
        image: uploadResponse.url,
      };
    }

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: updatePayload },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
