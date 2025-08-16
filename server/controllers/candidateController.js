const Candidate = require("../models/candidate");
const User = require("../models/user");

// helper
const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user && user.role === "admin";
  } catch {
    return false;
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createCandidate = async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);
    if (!isAdmin) {
      return res
        .status(403)
        .json({ error: "Access denied. Only admins can update candidates." });
    }
    const newCandidate = new Candidate(req.body);
    const response = await newCandidate.save();
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id))) {
      return res
        .status(403)
        .json({ error: "Access denied. Only admins can update candidates." });
    }
    const { candidateID } = req.params;
    const response = await Candidate.findByIdAndUpdate(candidateID, req.body, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id))) {
      return res
        .status(403)
        .json({ error: "Access denied. Only admins can delete candidates." });
    }
    const response = await Candidate.findByIdAndDelete(req.params.candidateID);
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.json({ message: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.vote = async (req, res) => {
  try {
    const candidateID = req.params.candidateID;
    const userId = req.user.id;

    const candidate = await Candidate.findById(candidateID);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVoted) return res.status(400).json({ message: "You have already voted" });
    if (user.role === "admin") return res.status(403).json({ message: "Admin is not allowed" });

    await Candidate.findByIdAndUpdate(candidateID,
      { $push: { votes: { user: userId } }, $inc: { voteCount: 1 } },
      { new: true }
    );

    user.isVoted = true;
    await user.save();

    res.json({ message: "Vote recorded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.voteCount = async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });
    const voteRecord = candidate.map((c) => ({ party: c.party, count: c.voteCount }));
    res.json({ voteRecord });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
