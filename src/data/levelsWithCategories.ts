import { levels } from './levels';
import { categoryItems1, categoryItems2, categoryItems3, categoryItems4, categoryItems5, categoryItems6, categoryItems7, categoryItems8, categoryItems9, categoryItems10, categoryItems11, categoryItems12, categoryItems13 } from './categoryData';

const categoryMap = [categoryItems1, categoryItems2, categoryItems3, categoryItems4, categoryItems5, categoryItems6, categoryItems7, categoryItems8, categoryItems9, categoryItems10, categoryItems11, categoryItems12, categoryItems13];

// Attach categoryItems to each level
levels.forEach((level, i) => {
  if (i < categoryMap.length) {
    level.categoryItems = categoryMap[i];
  }
});

export { levels as levelsWithCategories };
