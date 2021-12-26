export interface IQuestionOption {
  name: string;
  correct: boolean;
}

export interface IQuestion {
  options: IQuestionOption[];
  category: string;
  question: string;
}
