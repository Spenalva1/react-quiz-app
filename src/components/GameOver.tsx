import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import gameOverImg from '../assets/game-over.svg';

interface GameOverProps {
  score: number;
  isLoading: boolean;
  onGameRestart: () => void;
  onMainMenu: () => void;
}

function GameOver({
  score,
  onGameRestart,
  onMainMenu,
  isLoading,
}: GameOverProps) {
  return (
    <Stack gap="10">
      <Stack alignItems="center">
        <Image w="238px" src={gameOverImg} />
      </Stack>
      <Box textAlign="center">
        <Text fontSize="4xl">Results</Text>
        <Text>
          You got{' '}
          <Text as="span" fontSize="3xl" color="#60BF88">
            {score}
          </Text>{' '}
          correct answers
        </Text>
      </Box>
      <Stack gap="2">
        <Button
          isLoading={isLoading}
          variant="outline"
          borderColor="#2F527B"
          onClick={() => onGameRestart()}
        >
          Try again
        </Button>
        <Button borderColor="#2F527B" onClick={onMainMenu}>
          Main Menu
        </Button>
      </Stack>
    </Stack>
  );
}

export default GameOver;
