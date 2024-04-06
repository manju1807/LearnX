'use client';

import { Category } from '@prisma/client';
import {
  SiJavascript,
  SiReact,
  SiPython,
  SiNextdotjs,
  SiHtml5,
  SiGo,
  SiDjango,
  SiKotlin,
} from 'react-icons/si';
import { BiLogoNodejs } from 'react-icons/bi';
import { FaJava } from 'react-icons/fa6';
import { IconType } from 'react-icons';

import { CategoryItem } from './category-item';

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category['name'], IconType> = {
  Nodejs: BiLogoNodejs,
  Java: FaJava,
  'Full stack Development': SiJavascript,
  'MERN Stack': SiReact,
  Javascript: SiJavascript,
  ReactJS: SiReact,
  'Web development': SiJavascript,
  'Data Structures & Algorithm': SiPython,
  Programming: SiPython,
  Golang: SiGo,
  NextJS: SiNextdotjs,
  Python: SiPython,
  Django: SiDjango,
  'HTML & CSS': SiHtml5,
  Kotlin: SiKotlin,
};

export const Categories = ({ items }: CategoriesProps) => {
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
