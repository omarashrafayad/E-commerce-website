import { Query } from 'mongoose';

interface QueryString {
    page?: string;
    sort?: string;
    limit?: string;
    fields?: string;
    keyword?: string;
    [key: string]: any;
}

interface PaginationResult {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next?: number;
    prev?: number;
}

class ApiFeatures<T> {
    mongooseQuery: Query<T[], T>;
    queryString: QueryString;
    paginationResult?: PaginationResult;

    constructor(mongooseQuery: Query<T[], T>, queryString: QueryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryStringObj = { ...this.queryString };
        const excludesFields = ['page', 'fields', 'sort', 'limit', 'keyword'];
        excludesFields.forEach((el) => delete queryStringObj[el]);

        const processQuery = (obj: any): any => {
            if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;

            const result: any = {};
            for (const key in obj) {
                if (!obj.hasOwnProperty(key)) continue;

                const value = obj[key];
                const bracketMatch = key.match(/^(.+)\[(.+)\]$/);

                if (bracketMatch) {
                    const [, fieldName, operator] = bracketMatch;
                    if (!result[fieldName]) result[fieldName] = {};
                    result[fieldName][operator] = value;
                } else if (['gte', 'gt', 'lte', 'lt'].includes(key)) {
                    const numValue = Number(value);
                    result[`$${key}`] = isNaN(numValue) || value === '' ? value : numValue;
                } else if (typeof value === 'object' && value !== null) {
                    result[key] = processQuery(value);
                } else {
                    result[key] = value;
                }
            }
            return result;
        };

        const filterQuery = processQuery(queryStringObj);
        if (Object.keys(filterQuery).length > 0) {
            this.mongooseQuery = this.mongooseQuery.find(filterQuery);
        }
        return this;
    }

    // sort() {
    //     if (this.queryString.sort) {
    //         const sortBy = this.queryString.sort.split(',').join(' ');
    //         this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    //     } else {
    //         this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    //     }
    //     return this;
    // }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(`${sortBy} -_id`);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt -_id');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }

    search(modelName: string) {
        if (this.queryString.keyword) {
            let searchQuery: Record<string, any> = {};
            if (modelName === 'products') {
                searchQuery.$or = [
                    { title: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } },
                ];
            } else {
                searchQuery = { name: { $regex: this.queryString.keyword, $options: 'i' } };
            }
            this.mongooseQuery = this.mongooseQuery.and([searchQuery]);
        }
        return this;
    }

    paginate(countDocuments: number) {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 10;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        const pagination: PaginationResult = {
            currentPage: page,
            limit,
            numberOfPages: Math.ceil(countDocuments / limit),
        };

        if (endIndex < countDocuments) pagination.next = page + 1;
        if (skip > 0) pagination.prev = page - 1;

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;

        return this;
    }
}

export default ApiFeatures;
