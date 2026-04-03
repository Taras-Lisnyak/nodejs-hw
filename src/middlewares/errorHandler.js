const errorHandler = (err, req, res, next) => {
  req.log.error({ err }, 'Internal server error');
  res.status(500).json({ message: err.message || 'Internal server error' });
};

export default errorHandler;
