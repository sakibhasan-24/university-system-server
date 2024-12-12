import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  //properties
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //   set search

  search(searchAbleFields: string[]) {
    if (this?.query?.searchTerm) {
      const searchTerm = this?.query?.searchTerm as string;
      this.modelQuery = this?.modelQuery.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this?.query };
    const excludes = ["searchTerm", "sort", "fields", "limit", "page"];
    excludes.forEach((el) => delete queryObj[el]);
    this.modelQuery = this?.modelQuery?.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort = this?.query.sort || "createdAt";
    this.modelQuery = this?.modelQuery?.sort(sort as string);
    return this;
  }
  paginate() {
    let limit = Number(this?.query?.limit) || 1;
    let page = Number(this?.query?.page) || 1;
    let skip = (page - 1) * limit;
    this.modelQuery = this?.modelQuery?.skip(skip).limit(limit);
    return this;
  }
  fields() {
    const field = this?.query?.field
      ? (this?.query?.field as string)?.split(",")?.join(" ")
      : "-__v";
    this.modelQuery = this.modelQuery.select(field);
    return this;
  }
}

export default QueryBuilder;
