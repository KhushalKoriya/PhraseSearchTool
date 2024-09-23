import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Phrase } from './phrase.model';
import { Op } from 'sequelize';

@Injectable()
export class PhraseService {
  constructor(
    @InjectModel(Phrase)
    private readonly phraseModel: typeof Phrase,
  ) {}

  async getPhrase(id: number) {
    return this.phraseModel.findByPk(id);
  }

  async searchPhrases(query: string, sort: 'asc' | 'desc') {
    return this.phraseModel.findAll({
      where: {
        phrase: {
          [Op.like]: `%${query}%`,
        },
      },
      order: [['phrase', sort]],
    });
  }
}
