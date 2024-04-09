'use client';

import { NotesCategory } from '@prisma/client';
import {
  SiJavascript,
  SiReact,
  SiPython,
  SiNextdotjs,
  SiHtml5,
} from 'react-icons/si';
import { BiLogoNodejs } from 'react-icons/bi';
import { FaJava } from 'react-icons/fa6';
import { IconType } from 'react-icons';

import { CategoryItem } from './category-item';

interface CategoriesProps {
  items: NotesCategory[];
}

const iconMap: Record<NotesCategory['name'], IconType> = {
  Nodejs: BiLogoNodejs,
  Java: FaJava,
  Javascript: SiJavascript,
  ReactJS: SiReact,
  DSA: SiPython,
  NextJS: SiNextdotjs,
  'HTML & CSS': SiHtml5,
};

export const NotesCategories = ({ items }: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
