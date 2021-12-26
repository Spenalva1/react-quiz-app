import axios from 'axios';
import { IQuestion, IQuestionOption } from '../types/types';

const BASE_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';

interface Response {
  data: {
    results: {
      category: string;
      correct_answer: string;
      incorrect_answers: string[];
      question: string;
    }[];
  };
}

export async function fetchQuestion(
  config = {
    category: 'any',
    difficulty: 'any',
  }
): Promise<IQuestion> {
  const params = Object.entries(config).reduce((prev, [key, value]): any => {
    if (value !== 'any') {
      return {
        ...prev,
        [key]: value,
      };
    }
    return prev;
  }, {});

  console.log(params);

  const res: Response = await axios.get(BASE_URL, {
    params,
  });

  const data = res.data.results[0];
  const { category, question } = data;
  const options: IQuestionOption[] = [
    {
      name: data.correct_answer,
      correct: true,
    },
    ...data.incorrect_answers.map((incorrect) => ({
      name: incorrect,
      correct: false,
    })),
  ].sort(() => Math.random() - 0.5);
  return {
    category,
    question,
    options,
  };
}
