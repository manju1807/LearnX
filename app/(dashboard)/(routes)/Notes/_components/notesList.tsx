import { Notes } from '@prisma/client';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';

interface NotesListProps {
  items: Notes[];
}

export const NotesList = async ({ items }: NotesListProps) => {
  const categories = await db.notesCategory.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const categoryMap = new Map(
    categories.map((category: any) => [category.id, category.name])
  );

  return (
    <>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
        {items.map((item) => (
          <div
            key={item.id}
            className='relative border border-gray-200 rounded p-4'
          >
            <h3 className='text-lg font-semibold'>{item.title}</h3>
            <p className='text-sm text-gray-500'>{item.description}</p>
            <p className='absolute text-[0.50rem] font-medium text-gray-700 py-1 px-2 top-2 right-2 rounded-xl bg-green-200'>
              {categoryMap.get(item?.notesCategoryId)}
            </p>
            <div className='mt-12'>
              {item.docUrl && (
                <Button variant={'secondary'}>
                  <a
                    href={item.docUrl}
                    target='_blank'
                    className=' text-xs font-medium'
                  >
                    Download
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-10'>
          No notes found
        </div>
      )}
    </>
  );
};
