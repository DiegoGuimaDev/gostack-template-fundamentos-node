import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

function isValidType(type: string): boolean {
  const VALID_TYPES = ['income', 'outcome'];
  return VALID_TYPES.indexOf(type) > -1;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (!isValidType(type))
      throw new Error('Invalid type, accepted only income or outcome');


    const balance = this.transactionsRepository.getBalance();

    if(type === 'outcome') {
      if(value > balance.total) throw new Error('You don\'t have more money to do this transaction');
    }


    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
