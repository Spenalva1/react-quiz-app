import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Select,
  Stack,
} from '@chakra-ui/react';
import React, { SyntheticEvent, useRef } from 'react';
import questionCorner from '../assets/question-corner.svg';

interface MenuProps {
  isLoading: boolean;
  onGameStart: ({
    category,
    difficulty,
  }: {
    category: string;
    difficulty: string;
  }) => void;
}

function Menu({ isLoading, onGameStart }: MenuProps) {
  const categoryRef = useRef<HTMLSelectElement>(null);
  const difficultyRef = useRef<HTMLSelectElement>(null);

  const startGame = (e: SyntheticEvent) => {
    e.preventDefault();
    onGameStart({
      category: categoryRef?.current?.value || 'any',
      difficulty: difficultyRef?.current?.value || 'any',
    });
  };

  return (
    <form onSubmit={startGame}>
      <Image
        w={['125px', '160px']}
        position="absolute"
        top="0"
        right="0"
        transform="translateY(-65%)"
        src={questionCorner}
      />
      <Stack gap="4">
        <FormControl>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select name="category" id="category" ref={categoryRef}>
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
          <Select name="difficulty" id="difficulty" ref={difficultyRef}>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </FormControl>
        <Button
          isLoading={isLoading}
          variant="outline"
          borderColor="#2F527B"
          type="submit"
        >
          Start
        </Button>
      </Stack>
    </form>
  );
}

export default Menu;
