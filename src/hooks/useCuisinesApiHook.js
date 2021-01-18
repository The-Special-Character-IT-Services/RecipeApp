import useSWR from 'swr';

const useCuisinesApi = () => {
  const query = `
    {
        cuisines {
            id
            name
            image {
                formats
            }
        }
    }
  `;
  return useSWR([query]);
};

export default useCuisinesApi;
