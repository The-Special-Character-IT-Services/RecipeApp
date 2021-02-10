export const coursesQuery = (pageIndex, limit, sort = 'id:ASC') => `{
  courses(start: ${pageIndex * 10}, limit: ${limit}, sort: "${sort}") {
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
    
    launchDate
    image {
      name
      url
    }
  	recipes {
      id
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

const getInfiniteCourses = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;

  return [coursesQuery(pageIndex, 10), null, 'courses'];
};

export default getInfiniteCourses;
