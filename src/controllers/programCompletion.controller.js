const programCompletionService = require("../services/programCompletion.service");

const getMyProgramCompletions = async (req, res) => {
  try {
    const completions = await programCompletionService.getMyProgramCompletions(
      req.user.user_id,
    );

    return res.status(200).json({
      success: true,
      data: completions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProgramCompletion = async (req, res) => {
  try {
    const completion = await programCompletionService.createProgramCompletion(
      req.user.user_id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Program completion created successfully.",
      data: completion,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProgramCompletion = async (req, res) => {
  try {
    await programCompletionService.deleteProgramCompletion(
      req.user.user_id,
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Program completion deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyProgramCompletions,
  createProgramCompletion,
  deleteProgramCompletion,
};
