import { Currency } from 'src/common/enums/currency.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  from: Currency;

  @Column()
  to: Currency;

  @Column('decimal', { precision: 10, scale: 6 })
  exchangeRate: number;
}
