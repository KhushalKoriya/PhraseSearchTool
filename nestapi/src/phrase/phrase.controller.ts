import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { PhraseService } from './phrase.service';

@Controller('phrase')
export class PhraseController {
  constructor(private readonly phraseService: PhraseService) {}

  @Get('search')
  async search(@Query('query') query: string, @Query('sort') sort: 'asc' | 'desc') {
    
    if (!query) {
      throw new NotFoundException('Query parameter is required');
    }
    const phrases = await this.phraseService.searchPhrases(query, sort);
    return {
      data: phrases,
      status: 200,
      statusText: 'OK',
    };
  }

  @Get(':id')
  async getPhrase(@Param('id') id: number) {
    const phrase = await this.phraseService.getPhrase(id);
    if (!phrase) {
      throw new NotFoundException('Phrase not found');
    }
    return {
      id: phrase.id,
      phrase: phrase.phrase,
      status: phrase.status,
      createdAt: phrase.createdAt,
      updatedAt: phrase.updatedAt,
    };
  }

  @Get(':id/:language')
  async getPhraseTranslation(@Param('id') id: number, @Param('language') language: string) {
    const phrase = await this.phraseService.getPhrase(id);
    if (!phrase) {
      throw new NotFoundException('Phrase not found');
    }
    const translation = phrase.translations[language];
    if (!translation) {
      throw new NotFoundException('Translation not found');
    }
    return {
      translation,
    };
  }
}
