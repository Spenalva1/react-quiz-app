import { Box, Center, Container, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import bgImage from './assets/background.png';
import GameOver from './components/GameOver';
import Question from './components/Question';
import { fetchQuestion } from './api/question';
import { IQuestion } from './types/types';
import Menu from './components/Menu';

let config = {
  category: 'any',
  difficulty: 'any',
};

function App() {
  const [question, setQuestion] = useState<IQuestion | null>();
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getQuestion = async () => {
    setIsLoading(true);
    setQuestion(await fetchQuestion(config));
    setIsLoading(false);
  };

  const onQuestionAnswered = (answeredCorectly: boolean) => {
    if (answeredCorectly) {
      setScore((prev) => prev + 1);
      getQuestion();
    } else {
      setIsGameOver(true);
    }
  };

  const onGameStart = (newConfig?: {
    category: string;
    difficulty: string;
  }) => {
    if (newConfig) {
      config = newConfig;
    }
    setScore(0);
    setIsGameOver(false);
    setQuestion(null);
    getQuestion();
  };

  const onMainMenu = () => {
    setScore(0);
    setIsGameOver(false);
    setQuestion(null);
  };

  return (
    <Center
      backgroundImage={bgImage}
      backgroundPosition="center"
      objectFit="cover"
      height="100vh"
      userSelect="none"
    >
      <Container maxW="465px">
        <Stack direction="column">
          <Text
            as="h1"
            color="white"
            fontWeight="bold"
            fontSize={['2xl', '4xl']}
          >
            QUIZ APP
          </Text>
          <Box
            py={[8, 12]}
            px="8"
            backgroundColor="white"
            color="#2F527B"
            borderRadius="3xl"
            position="relative"
          >
            {!question && !isGameOver && (
              <Menu onGameStart={onGameStart} isLoading={isLoading} />
            )}
            {question && !isGameOver && (
              <Question
                onQuestionAnswered={onQuestionAnswered}
                question={question || null}
                isLoading={isLoading}
              />
            )}
            {question && isGameOver && (
              <GameOver
                score={score}
                onMainMenu={onMainMenu}
                onGameRestart={onGameStart}
                isLoading={isLoading}
              />
            )}
          </Box>
        </Stack>
      </Container>
    </Center>
  );
}

export default App;
