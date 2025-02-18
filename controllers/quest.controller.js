const questService = require('../services/quest.service');
const User = require('../models/User');
const { DTO } = require('../DTOs/DTOs');

class QuestController {
  async getRandomQuest(req, res) {
    try {
      const quest = await questService.getRandomQuest(req.params.userId);

      const questDTO = DTO(quest, null);

      res.json(questDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async completeQuest(req, res) {
    try {
      const images = req.files.map((file) => file.path);
      const completedQuest = await questService.completeQuest(req.params.userId, images);

      const completedQuestDTO = DTO(completedQuest, null);

      res.json(completedQuestDTO);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Get current active quest for user
   */
  async getCurrentQuest(req, res) {
    try {
      const quest = await questService.getCurrentQuest(req.params.userId);
      res.json({
        data: quest,
        error: null,
      });
    } catch (error) {
      res.json({
        data: null,
        error: error.message,
      });
    }
  }

  /**
   * Get all completed quests for user
   */
  async getAllQuests(req, res) {
    try {
      const quests = await questService.getAllQuests(req.params.userId);
      res.json({
        data: quests,
        error: null,
      });
    } catch (error) {
      res.json({
        data: null,
        error: error.message,
      });
    }
  }
}

module.exports = new QuestController();
