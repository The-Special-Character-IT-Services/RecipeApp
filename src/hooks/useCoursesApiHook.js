export const coursesQuery = ({ pageIndex, limit, sort = 'id:ASC', where = '{}', userId }) => `{
  courses(
    start: ${pageIndex * 10},
     limit: ${limit},
      sort: "${sort}",
       where: ${where}) {
    id
    name
    caption
    price
    validity
    launchDate
    image {
      url
    }
    recipes {
      id
    }
    rattings {
      id
      ratting
    }
    cuisine{
      id
      name
    }
    purchase_details(where: { user_id: { id: ${userId} } }) {
      id
      course {
        id
      }
      status
    }
    updated_at
  }
}`;

export const courseQuery = (id, userId) => `{
  course(id: ${id}) {
    id
    name
    description
    caption
    price
    currency
    validity
    promoVideo {
      name
      url
    }
    promoVideoYoutubeId
    cuisine {
      name
      image {
        name
        url
      }
    }
    launchDate
    
    image {
      name
      url
    }
    rattings {
      id
      ratting
    }
    recipes {
      id
      name
      description
      cookingLevel
      recipeImage {
        name
        url
      }
      isIndividual {
        price
        validity
      }
      categories {
        id
        name
      }
    }
    like_event(where: { user: { id: ${userId} } }) {
      course {
        id
      }
      user {
        id
      }
    }
    rattings {
      ratting
    }
    purchase_details(where: { user_id: { id: ${userId} } }) {
      user_id {
        id
      }
    }
  }
}`;

export const coursesSearchQuery = (pageIndex, limit, sort = 'id:ASC', where = {}) => `{
  courses(start: ${pageIndex * 10}, limit: ${limit}, sort: "${sort}", where: ${where}) {
    id
    name
    image {
      url
    }
    recipes {
      id
    }
   
  }
}`;

export const coursesCategoryQuery = (pageIndex, limit, sort = 'id:ASC', where = '{}') => `{
  courses(start: ${pageIndex * limit}, limit: ${limit}, sort: "${sort}", where: ${where}){
    id
    name
    image {
      url
      formats
    }
    cuisine{
      id
      name
      image{
        url
      }
    }
    recipes {
      id
    }
   
  }
}`;

const getInfiniteCourses = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;

  return [coursesQuery({ pageIndex, limit: 10 }), null, 'courses'];
};

export const getInfiniteFilteredCourses = (pageIndex, previousPageData) => {
  console.log(previousPageData);
  if (pageIndex === 0 || previousPageData?.courses?.length > 0) {
    return coursesCategoryQuery(pageIndex, 2, 'updated_at:DESC');
  }
  return null;
};

export default getInfiniteCourses;
