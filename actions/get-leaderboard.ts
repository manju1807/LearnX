import { TestResults } from '@prisma/client';
import { db } from '@/lib/db';

export type ResultWithResultID = TestResults & {};

export const getLeaderboard = async (): Promise<{
  [userId: string]: ResultWithResultID[];
} | null> => {
  try {
    const leaderboard = await db.testResults.findMany({
      distinct: ['userId'],
      include: {
        attempt: true,
        category: true,
        test: true,
      },
    });
    const leaderboardObject: { [userId: string]: ResultWithResultID[] } = {};
    leaderboard.forEach((result) => {
      if (!leaderboardObject[result.userId]) {
        leaderboardObject[result.userId] = [];
      }
      leaderboardObject[result.userId].push(result);
    });

    return leaderboardObject;
  } catch (error) {
    console.log('[GET_LEADERBOARD]', error);
    return null;
  }
};
