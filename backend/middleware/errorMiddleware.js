// Takes care of wrong wrong routes e.g /api/testular
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// Takes care of id not with the same format of as the ids of the products
// also takes care of errors due to id not found in the server
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

export { notFound, errorHandler };