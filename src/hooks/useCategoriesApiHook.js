import useSWR from 'swr';

const useCategoriesApi = () => {
  const query = `
  {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  `;
  return useSWR([query]);
};

export default useCategoriesApi;
