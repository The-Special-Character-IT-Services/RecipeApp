import useSWR from 'swr';

const useCategoriesApi = () => {
  const query = `
  {
    categories {
      id
      name
      iconName
    }
  }
  `;
  return useSWR([query]);
};

export default useCategoriesApi;
