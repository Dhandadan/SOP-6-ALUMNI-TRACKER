const {
  User,
  AlumniProfile,
  Program,
  ProgramCompletion,
} = require("../models");

const getMyProgramCompletions = async (userId) => {
  const profile = await AlumniProfile.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!profile) {
    throw new Error("Alumni profile not found.");
  }

  const completions = await ProgramCompletion.findAll({
    where: {
      profile_id: profile.profile_id,
    },
    include: [
      {
        model: Program,
        as: "program",
        attributes: ["program_id", "program_name"],
      },
    ],
  });

  return completions;
};

const createProgramCompletion = async (userId, data) => {
  const profile = await AlumniProfile.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!profile) {
    throw new Error("Alumni profile not found.");
  }

  const {
    program_id,
    year_completed,
    tesda_cert_level,
    certificate_file_path,
  } = data;

  const program = await Program.findByPk(program_id);

  if (!program) {
    throw new Error("Program not found.");
  }

  const existingCompletion = await ProgramCompletion.findOne({
    where: {
      profile_id: profile.profile_id,
      program_id: program_id,
    },
  });

  if (existingCompletion) {
    throw new Error("Program already completed.");
  }

  const completion = await ProgramCompletion.create({
    profile_id: profile.profile_id,
    program_id,
    year_completed,
    tesda_cert_level,
    certificate_file_path,
  });

  return completion;
};

const deleteProgramCompletion = async (userId, completionId) => {
  const profile = await AlumniProfile.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!profile) {
    throw new Error("Alumni profile not found.");
  }

  const completion = await ProgramCompletion.findOne({
    where: {
      completion_id: completionId,
      profile_id: profile.profile_id,
    },
  });

  if (!completion) {
    throw new Error("Program completion not found.");
  }

  await completion.destroy();

  return true;
};

module.exports = {
  getMyProgramCompletions,
  createProgramCompletion,
  deleteProgramCompletion,
};
