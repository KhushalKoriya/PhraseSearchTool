import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhraseService } from './phrase.service';
import { PhraseController } from './phrase.controller';
import { Phrase } from './phrase.model';

@Module({
  imports: [SequelizeModule.forFeature([Phrase])],
  controllers: [PhraseController],
  providers: [PhraseService],
})
export class PhraseModule {}
