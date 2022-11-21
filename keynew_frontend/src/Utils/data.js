// fetching sanity data

export const userQuery = (userId) =>  {
    // get a document of type=user and id = userId
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
}