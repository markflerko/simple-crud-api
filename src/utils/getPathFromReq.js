const pathParser = (req) => {
  try {
    const path_full = req.url.split("/").slice(1);
    const [path, person_id] = path_full;
    return person_id;
  } catch (error) {
    throw error;
  }
};

module.exports = pathParser;
