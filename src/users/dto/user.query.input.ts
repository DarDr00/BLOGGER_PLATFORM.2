import { PaginationAndSorting } from "../../core/types/pagination-and-sorting";
import { UserSortField } from "./users.queryFields.type";

export type UserQueryInput = PaginationAndSorting<UserSortField> &
    Partial<{
        searchLoginTerm: string;    
        searchEmailTerm: string;    
    }>