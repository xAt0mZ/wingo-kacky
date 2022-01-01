export default (env) => {
  const isProduction = env === 'production';
  return {
    devtool: isProduction ? 'source-map' : 'inline-source-map'
  };
};