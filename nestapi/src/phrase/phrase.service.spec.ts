import { Test, TestingModule } from '@nestjs/testing';
import { PhraseService } from './phrase.service';
import { getModelToken } from '@nestjs/sequelize';
import { Phrase } from './phrase.model';

describe('PhraseService', () => {
  let service: PhraseService;
  let phraseModelMock: any;

  const createMockPhrase = (id: number, phrase: string, status: string) => ({
    id,
    phrase,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
    translations: {
      fr: 'Translated to French',
      es: 'Translated to Spanish',
    },
  });

  beforeEach(async () => {
    phraseModelMock = {
      findByPk: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhraseService,
        {
          provide: getModelToken(Phrase),
          useValue: phraseModelMock,
        },
      ],
    }).compile();

    service = module.get<PhraseService>(PhraseService);
  });

  it.each([
    [1, 'Hi, I’m a phrase', 'active'],
    [2, 'Hello, world', 'pending'],
  ])('should return a phrase by ID: %i', async (id, expectedPhrase, status) => {
    phraseModelMock.findByPk.mockResolvedValue(createMockPhrase(id, expectedPhrase, status));
    const result = await service.getPhrase(id);
    expect(result).toEqual(expect.objectContaining({
      id,
      phrase: expectedPhrase,
      status,
      translations: expect.any(Object),
    }));
  });

  it('should return null when no phrase found', async () => {
    phraseModelMock.findByPk.mockResolvedValue(null);
    const result = await service.getPhrase(99); // Assuming 99 doesn't exist
    expect(result).toBeNull();
  });

  it('should return phrases matching query', async () => {
    const phrases = [
      createMockPhrase(1, 'Hi, I’m a phrase', 'active'),
      createMockPhrase(2, 'Hello, world', 'pending'),
    ];
    phraseModelMock.findAll.mockResolvedValue(phrases);
    
    const result = await service.searchPhrases('phrase', 'asc');
    expect(result).toEqual(phrases);
  });

  it('should return an empty array when no phrases match the query', async () => {
    phraseModelMock.findAll.mockResolvedValue([]);
    const result = await service.searchPhrases('nonexistent', 'asc');
    expect(result).toEqual([]);
  });
});
