import { TestResults } from '@prisma/client';
import { db } from '@/lib/db';

export type ResultWithResultID = TestResults & {};

type GetTestResults = {
  testResultsId: string;
};

export const getTestResults = async ({
  testResultsId,
}: GetTestResults): Promise<ResultWithResultID | null> => {
  try {
    const testResults = await db.testResults.findUnique({
      where: {
        id: testResultsId,
      },
      include: {
        attempt: true,
        category: true,
        test: true,
      },
    });

    return testResults;
  } catch (error) {
    console.log('[GET_TEST_RESULTS]', error);
    return null;
  }
};
