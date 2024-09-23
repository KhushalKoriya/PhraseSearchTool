import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhraseModule } from './phrase/phrase.module'; 
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql', 
      host: 'localhost', 
      port: 3306,        
      username: 'root',  
      password: '',     
      database: 'phrase_db', 
      autoLoadModels: true, 
      synchronize: true,   
    }),
    PhraseModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  // This runs when the module is initialized
  async onModuleInit() {
    try {
      // Try to authenticate the Sequelize connection to check if DB is connected
      await this.sequelize.authenticate();
      console.log('Database connected successfully');
    } catch (error) {
      // Catch and log any errors during connection
      console.error('Database connection failed:', error);
    }
  }
}
