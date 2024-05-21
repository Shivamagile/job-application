import { PaginationDto } from '../dto/common.dto';

export const usePagination = ({
  page,
  search,
  limit,
  sort_by,
  sort_order,
}: PaginationDto) => {
  const isNumber = !isNaN(+page) && !isNaN(+limit);
  return {
    take: isNumber ? +limit : 0,
    skip: isNumber ? Math.floor((+page - 1) * +limit) : 0,
    search,
    sort_by,
    sort_order: sort_order || 'ASC',
    page: isNumber ? +page : undefined,
  };
};
