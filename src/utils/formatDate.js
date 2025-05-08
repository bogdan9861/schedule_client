export const formatDate = date => {
  let formatedDate = date?.split('T').shift();

  const Y = formatedDate.split('-')[0];
  const M = formatedDate.split('-')[1];
  const D = formatedDate.split('-')[2];

  return `${D}.${M}.${Y}`;
};
