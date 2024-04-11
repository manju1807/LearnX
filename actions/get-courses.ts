import { Category, Course, Notes, NotesCategory } from '@prisma/client';
import { getProgress } from '@/actions/get-progress';
import { db } from '@/lib/db';

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

type GetNotes = {
  title?: string;
  notesCategoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log('[GET_COURSES]', error);
    return [];
  }
};

export const getNotes = async ({
  title,
  notesCategoryId,
}: GetNotes): Promise<Notes[]> => {
  try {
    const notes = await db.notes.findMany({
      where: {
        title,
        notesCategoryId,
        isPublished: true,
      },
      include: {
        notesCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return notes;
  } catch (error) {
    console.log('[GET_notes]', error);
    return [];
  }
};
