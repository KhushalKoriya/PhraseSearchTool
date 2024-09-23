import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Phrase extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phrase: string;

  @Column({
    type: DataType.ENUM('active', 'pending', 'spam', 'deleted'),
    allowNull: false,
  })
  status: 'active' | 'pending' | 'spam' | 'deleted';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  translations: {
    fr: string;
    es: string;
  };
}
