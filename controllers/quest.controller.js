const questService = require('../services/quest.service');
const User = require('../models/User');
const { DTO } = require('../DTOs/DTOs');

class QuestController {
  async getRandomQuest(req, res) {
    try {
      const quest = await questService.getRandomQuest(req.params.userId);
      res.json(DTO(quest, null));
    } catch (error) {
      res.status(400).json(DTO(null, error.message));
    }
  }

  async completeQuest(req, res) {
    try {
      console.log(req.files); // Debugging: Check if files are being received correctly
      const images = req.files?.map((file) => file.path) || []; // req.files is an array
      const completedQuest = await questService.completeQuest(req.params.userId, images);
      res.json(DTO(completedQuest, null));
    } catch (error) {
      res.status(400).json(DTO(null, error.message));
    }
  }

  /**
   * Get current active quest for user
   */
  async getCurrentQuest(req, res) {
    try {
      const quest = await questService.getCurrentQuest(req.params.userId);
      res.json(DTO(quest, null));
    } catch (error) {
      res.status(400).json(DTO(null, error.message));
    }
  }

  /**
   * Get all completed quests for user
   */
  async getAllQuests(req, res) {
    try {
      const quests = await questService.getAllQuests(req.params.userId);
      res.json(DTO(quests, null));
    } catch (error) {
      res.status(400).json(DTO(null, error.message));
    }
  }
}

module.exports = new QuestController();
