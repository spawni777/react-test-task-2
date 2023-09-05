import {faker} from '@faker-js/faker';

export const generateDescription = () => {
  return faker.commerce.productDescription();
}

export const generatePastDate = () => {
  return faker.date.past().getTime();
}

export const generateFutureDate = () => {
  return faker.date.future().getTime();
}

export const generateTagName = () => {
  return faker.hacker.noun();
}
