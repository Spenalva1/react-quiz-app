import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { IQuestion, IQuestionOption } from '../types/types';
import questionCorner from '../assets/question-corner.svg';

interface QuestionProps {
  question: IQuestion | null;
  onQuestionAnswered: (answeredCorrectly: boolean) => void;
  isLoading?: boolean;
}

function Question({ question, onQuestionAnswered, isLoading }: QuestionProps) {
  const [optionSelected, setOptionSelected] = useState<{
    isSelected: boolean;
    option: IQuestionOption | null;
  }>({ isSelected: false, option: null });

  useEffect(() => {
    setOptionSelected({ isSelected: false, option: null });
  }, [question]);

  const getOptionHoverStyle = useCallback(() => {
    if (optionSelected.isSelected) return {};
    return {
      bg: '#F9A826',
      borderColor: '#F9A826',
      color: 'white',
    };
  }, [optionSelected.isSelected]);

  const getOptionActiveStyle = useCallback(() => {
    if (optionSelected.isSelected) return {};
    return {
      bg: '#e58f06',
      borderColor: '#e58f06',
    };
  }, [optionSelected.isSelected]);

  const getBackgroundStyle = useCallback(
    (option: IQuestionOption) => {
      if (optionSelected.isSelected && option.correct) return '#60BF88';
      if (optionSelected.isSelected && optionSelected.option === option)
        return '#EA8282';
      return 'white';
    },
    [optionSelected]
  );

  const getBorderColor = useCallback(
    (option: IQuestionOption) => {
      if (optionSelected.isSelected && option.correct) return '#60BF88';
      if (optionSelected.isSelected && optionSelected.option === option)
        return '#EA8282';
      return 'rgba(96, 102, 208, 0.7)';
    },
    [optionSelected]
  );

  const onOptionSelected = (option: IQuestionOption) => {
    if (optionSelected.isSelected) return;
    setOptionSelected({
      isSelected: true,
      option,
    });
  };

  if (!question) return <Text>Loading...</Text>;

  return (
    <Stack gap="4">
      <Image
        w={['125px', '160px']}
        position="absolute"
        top="0"
        right="0"
        transform="translateY(-65%)"
        src={questionCorner}
      />
      <Box>
        <Text>category: {question.category}</Text>
        <Text
          fontWeight="bold"
          fontSize="2xl"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </Box>
      <Stack gap="4">
        {question?.options.map((option, i) => (
          <Box
            cursor={optionSelected.isSelected ? 'auto' : 'pointer'}
            onClick={() => onOptionSelected(option)}
            key={option.name}
            display="flex"
            alignItems="center"
            color={
              optionSelected.isSelected &&
              (option.correct || optionSelected.option === option)
                ? 'white'
                : '#6066D0'
            }
            borderWidth="2px"
            borderStyle="solid"
            borderColor={getBorderColor(option)}
            px="5"
            py="2"
            borderRadius="2xl"
            bg={getBackgroundStyle(option)}
            _hover={getOptionHoverStyle()}
            _active={getOptionActiveStyle()}
          >
            <Text mr={10} fontSize="2xl">
              {String.fromCharCode(65 + i)}
            </Text>
            <Text
              fontSize="xl"
              flex="1"
              dangerouslySetInnerHTML={{ __html: option.name }}
            />
            {optionSelected.isSelected && option.correct && (
              <Box
                w="25px"
                h="25px"
                p="2"
                border="2px solid white"
                borderRadius="full"
                position="relative"
              >
                <CheckIcon
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%) scale(0.8)"
                />
              </Box>
            )}
            {optionSelected.isSelected &&
              !option.correct &&
              optionSelected.option === option && (
                <Box
                  w="25px"
                  h="25px"
                  p="2"
                  border="2px solid white"
                  borderRadius="full"
                  position="relative"
                >
                  <CloseIcon
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%) scale(0.7)"
                  />
                </Box>
              )}
          </Box>
        ))}
      </Stack>
      {optionSelected.isSelected && optionSelected.option && (
        <Box textAlign="right">
          <Button
            w="auto"
            marginLeft="auto"
            colorScheme="orange"
            color="white"
            isLoading={isLoading}
            bg="#F9A826"
            _hover={{
              background: '#e58f06',
            }}
            _active={{
              background: '#e58f06',
            }}
            onClick={() =>
              onQuestionAnswered(optionSelected.option?.correct || false)
            }
          >
            Next
          </Button>
        </Box>
      )}
    </Stack>
  );
}

export default Question;
