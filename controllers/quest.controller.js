const questService = require('../services/quest.service');
const User = require('../models/User');
const { ApiResponse, ApiError } = require('../DTOs/DTOs');
const { default: axios } = require('axios');
const FormData = require('form-data');
const imageService = require('../services/image.service');

class QuestController {
  async getRandomQuest(req, res) {
    try {
      const quest = await questService.getRandomQuest(req.params.userId);
      res.status(200).json(ApiResponse(quest, 200, 'Случайный квест получен'));
    } catch (error) {
      res.status(400).json(ApiError(error.message, 400, 'Ошибка при получении квеста'));
    }
  }

  async completeQuest(req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' });
      }

      const completedQuest = await questService.completeQuest(req.params.userId, req.files);

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
      res.status(400).json(ApiError(error.message, 400, 'Нет активного квеста!'));
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
