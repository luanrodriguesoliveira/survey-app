import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Survey } from '../entity/Survey';
import { User } from '../entity/User';
import { Question } from '@src/entity/Question';

@Controller('survey')
export class SurveyController {
  private surveyRepository = getRepository(Survey);
  private userRepository = getRepository(User);
  private questionRepository = getRepository(Question);

  @Get(':id')
  private async getSurvey(req: Request, res: Response): Promise<void> {
    const survey = await this.surveyRepository.findOne(req.params.id);
    res.send(survey);
  }

  @Post('')
  private async postSurvey(req: Request, res: Response): Promise<void> {
    try {
      const survey = new Survey();
      const user = await this.userRepository.findOne(req.body.userId);
      survey.title = req.body.title;
      survey.user = user as User;

      const questions = req.body.questions.map(async (question: Omit<Question, 'id'>) => {
        const questionSaved = await this.questionRepository.save(question);
        return questionSaved.id;
      });

      survey.questions = questions;

      const response = await this.surveyRepository.save(survey);

      res.status(201).send(JSON.stringify(response));
    } catch (error) {
      res.status(500).send(JSON.stringify(error));
    }
  }

  @Put(':id')
  private async putSurvey(req: Request, res: Response): Promise<void> {
    try {
      const survey = await this.surveyRepository.findOne(req.params.id);
      this.surveyRepository.merge(survey as Survey, req.body);
      const response = await this.surveyRepository.save(survey as Survey);
      res.send(JSON.stringify(response));
    } catch (error) {
      res.status(500).send(error);
    }
  }

  @Delete(':id')
  private async deleteSurvey(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.surveyRepository.delete(req.params.id);
      res.send(JSON.stringify(response));
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
