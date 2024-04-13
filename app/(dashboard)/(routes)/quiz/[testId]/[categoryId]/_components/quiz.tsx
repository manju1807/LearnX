'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { QuestionWithCategory } from '@/actions/get-questions';
import toast from 'react-hot-toast';
import MCQCounter from './MCQCounter';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';

interface Props {
  questions: QuestionWithCategory[];
  categoryId: string;
  testId: string;
}

interface UserAnswer {
  questionId: string;
  optionIndex: number;
}

const MCQQuestions = (props: Props) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const { questions } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<number>(-1);
  const [score, setScore] = useState<number>(0);
  const [RightAns, setRightAns] = useState<number>(0);
  const [WrongAns, SetWrongAns] = useState<number>(0);
  const [isEnded, SetEnded] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<
    QuestionWithCategory[]
  >(questions.slice(0, 10));
  useEffect(() => {
    const shuffledQuestions = questions
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setShuffledQuestions(shuffledQuestions);
    setStartTime(Date.now());
  }, [questions]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(-1);
    } else {
      SetEnded(true);
      confetti.onOpen();
      setEndTime(Date.now());
    }
  }, [confetti, currentQuestionIndex, shuffledQuestions.length]);

  const checkAnswer = useCallback(
    (selectedAnswerIndex: number) => {
      const correctAnswerIndex =
        shuffledQuestions[currentQuestionIndex].correctAns;
      const currentQuestionId = shuffledQuestions[currentQuestionIndex].id;
      const userAnswer: UserAnswer = {
        questionId: currentQuestionId,
        optionIndex: selectedAnswerIndex,
      };
      setUserAnswers((prevAnswers) => [...prevAnswers, userAnswer]);
      if (selectedAnswerIndex === correctAnswerIndex) {
        setScore(score + 1);
        setRightAns(RightAns + 1);
        toast.success('Right Answer!');
      } else {
        SetWrongAns(WrongAns + 1);
        toast.error('Wrong Answer!');
      }
      handleNext();
    },
    [
      shuffledQuestions,
      currentQuestionIndex,
      handleNext,
      score,
      RightAns,
      WrongAns,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === '1') {
        setSelectedChoice(0);
        checkAnswer(0);
      } else if (key === '2') {
        setSelectedChoice(1);
        checkAnswer(1);
      } else if (key === '3') {
        setSelectedChoice(2);
        checkAnswer(2);
      } else if (key === '4') {
        setSelectedChoice(3);
        checkAnswer(3);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [checkAnswer, handleNext]);

  const totalQuestionsAttempted = RightAns + WrongAns;
  const accuracy =
    totalQuestionsAttempted > 0
      ? (RightAns / totalQuestionsAttempted) * 100
      : 0;
  const elapsedTime = (endTime - startTime) / 1000;

  const handleCheckAnalysis = async () => {
    try {
      const response = await axios.post(`/api/quiz/results/`, {
        testId: props.testId,
        categoryId: props.categoryId,
        accuracy: accuracy,
        score: score,
        TestDuration: elapsedTime,
      });
      toast.success('Test Stats Updated!');
      router.push(
        `/quiz/${response.data.testId}/${response.data.categoryId}/${response.data.id}`
      );
    } catch (error: any) {
      toast.error('Something Went Wrong!');
      console.error('Error:', error.message);
    }
  };

  return isEnded ? (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle className='text-center'>Quiz Completed!</CardTitle>
          <CardDescription className='text-center flex flex-col'>
            Score: {score}/{shuffledQuestions.length}
            <span className='pt-6'>
              For More Detailed Analysis click Here!
              <CardFooter className='grid place-content-center py-2'>
                <Button onClick={handleCheckAnalysis}>Check Analysis</Button>
              </CardFooter>
            </span>
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  ) : (
    <Card>
      <CardContent>
        <CardHeader className='flex flex-row items-center justify-between px-0'>
          <CardContent className='p-0'>
            <CardTitle className='text-xl'>Multiple Choice</CardTitle>
            <CardDescription className='text-md flex flex-row justify-center items-center'>
              <span className='text-sm mr-2'>
                {`${currentQuestionIndex + 1} / ${shuffledQuestions.length}`}
              </span>
              {shuffledQuestions[currentQuestionIndex].question}
            </CardDescription>
          </CardContent>
          <MCQCounter correct_answers={RightAns} wrong_answers={WrongAns} />
        </CardHeader>
        <CardDescription className='flex flex-col items-center justify-center w-full mt-4'>
          {shuffledQuestions[currentQuestionIndex].options.map(
            (option, index) => (
              <Button
                key={option}
                variant={selectedChoice === index ? 'default' : 'outline'}
                className='justify-start w-full py-8 mb-4'
                onClick={() => {
                  setSelectedChoice(index);
                  checkAnswer(index);
                }}
              >
                <div className='flex items-center justify-start'>
                  <div className='p-2 px-3 mr-5 border rounded-md'>
                    {index + 1}
                  </div>
                  <div className='text-start'>{option}</div>
                </div>
              </Button>
            )
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default MCQQuestions;
