import { getTestResults } from '@/actions/get-results';
import React, { Fragment } from 'react';
import ResultsCard from './_components/results';
import AccuracyCard from './_components/accuracy';
import TimeTakenCard from './_components/Timetaken';
import CorrectnessCard from './_components/Correctness';
import Scorecard from './_components/Scorecard';
import { getLeaderboard } from '@/actions/get-leaderboard';
import Leaderboard from './_components/leaderboard';

const ResultPage = async ({
  params,
}: {
  params: { TestResultsId: string };
}) => {
  const { TestResultsId } = params;
  const results = await getTestResults({ testResultsId: TestResultsId });

  return (
    <div className='p-6'>
      {results === null ? (
        <div>No results found</div>
      ) : (
        <Fragment>
          <ResultsCard accuracy={results.accuracy} />
          <div className='grid gap-4 mt-4 md:grid-cols-8'>
            <AccuracyCard accuracy={results.accuracy} />
            <TimeTakenCard ElapsedTime={results.TestDuration} />
          </div>
          <div className='grid gap-4 mt-4 md:grid-cols-8'>
            <CorrectnessCard accuracy={results.accuracy} />
            <Scorecard score={results.score} />
          </div>
          <Leaderboard data={results} />
        </Fragment>
      )}
    </div>
  );
};

export default ResultPage;
