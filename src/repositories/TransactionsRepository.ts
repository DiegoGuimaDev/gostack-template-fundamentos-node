import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionCreateDTO {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totalOutcome = 0;
    let total = 0;

    this.transactions.forEach(transacao => {
      if (transacao.type === 'outcome') {
        totalOutcome += transacao.value;
        total -= transacao.value;
      } else {
        totalIncome += transacao.value;
        total += transacao.value;
      }
    });
    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: total,
    };
  }

  public create({ title, value, type }: TransactionCreateDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
