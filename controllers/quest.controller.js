const questService = require('../services/quest.service');
const User = require('../models/User');
const { ApiResponse, ApiError } = require('../DTOs/DTOs');

class QuestController {
  async getRandomQuest(req, res) {
    try {
      const quest = await questService.getRandomQuest(req.params.userId);
      res.status(200).json(ApiResponse(quest, 200, 'Случайный квест получен'));
    } catch (error) {
      res.status(400).json(ApiError(error.message, 400, 'Ошибка при получении квеста'));
    }
  }

  async completeQuest(req, res) {
    try {
      const images = req.files?.map((file) => file.path) || [];
      const completedQuest = await questService.completeQuest(req.params.userId, images);
      res.status(200).json(ApiResponse(completedQuest, 200, 'Квест успешно завершен'));
    } catch (error) {
      res.status(400).json(ApiError(error.message, 400, 'Ошибка при завершении квеста'));
    }
  }

  /**
   * Get current active quest for user
   */
  async getCurrentQuest(req, res) {
    try {
      const quest = await questService.getCurrentQuest(req.params.userId);
      res.status(200).json(ApiResponse(quest, 200, 'Текущий квест получен'));
    } catch (error) {
      res.status(400).json(ApiError(error.message, 400, 'Ошибка при получении текущего квеста'));
    }
  }

  /**
   * Get all completed quests for user
   */
  async getAllQuests(req, res) {
    try {
      const quests = await questService.getAllQuests(req.params.userId);
      res.status(200).json(ApiResponse(quests, 200, 'Список квестов получен'));
    } catch (error) {
      res.status(400).json(ApiError(error.message, 400, 'Ошибка при получении всех квестов'));
    }
  }
}

module.exports = new QuestController();
