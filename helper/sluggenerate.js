const generateSlug = (Text) => {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

module.exports = generateSlug;
