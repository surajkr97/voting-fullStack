const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../jwt");
const candidateController = require("../controllers/candidateController");

router.get("/", candidateController.getAllCandidates);
router.post("/", jwtAuthMiddleware, candidateController.createCandidate);
router.put("/:candidateID", jwtAuthMiddleware, candidateController.updateCandidate);
router.delete("/:candidateID", jwtAuthMiddleware, candidateController.deleteCandidate);
router.post("/vote/:candidateID", jwtAuthMiddleware, candidateController.vote);
router.get("/vote/count", candidateController.voteCount);

module.exports = router;