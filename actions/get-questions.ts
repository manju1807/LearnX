import { Question, TestCategory } from '@prisma/client';
import { db } from '@/lib/db';

export type QuestionWithCategory = Question & {
  category: TestCategory | null;
};

type GetQuestions = {
  categoryId?: string;
};

export const getQuestions = async ({
  categoryId,
}: GetQuestions): Promise<QuestionWithCategory[]> => {
  try {
    const questions = await db.question.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return questions;
  } catch (error) {
    console.log('[GET_QUESTIONS]', error);
    return [];
  }
};
