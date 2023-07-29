export const buildPagination = (count: number, query: any) => {
  let { limit = "20", page = "1" } = query;
  limit = parseInt(limit);
  page = parseInt(page);
  if (limit < 1) limit = 20;
  if (page < 1) page = 1;
  return {
    pagination: {
      total: count,
      perPage: limit,
      currentPage: page,
      lastPage: Math.ceil(count / limit),
    },
    page: page,
    limit: limit,
    startingOffset: (page - 1) * limit,
  };
};
