const Internship = require("../models/internship");

module.exports.fetchInternships = async (req, res) => {
  try {
    const filters = {};

    const {
      minApplicants,
      maxApplicants,
      category,
      minDuration,
      maxDuration,
      location,
      timings,
      skills,
      type,
      search,
    } = req.query;

    if (minApplicants && maxApplicants) {
      filters.applicants = {
        $gte: parseInt(minApplicants),
        $lte: parseInt(maxApplicants),
      };
    }

    if (category) {
      filters.category = {
        $in: category,
      };
    }

    if (search) {
      filters.category = {
        $in: [
          ...(filters.category?.$in ? filters.category.$in : []),
          ...search.split(" "),
        ],
      };
    }

    if (minDuration && maxDuration) {
      filters.duration = {
        $gte: parseInt(minDuration),
        $lte: parseInt(maxDuration),
      };
    }

    if (location) {
      filters.location = { $in: location };
    }

    if (timings) {
      filters.timing = timings;
    }

    if (skills) {
      filters.skills = { $in: skills };
    }

    if (type) {
      filters.type = type;
    }

    let internships = await Internship.find(
      Object.entries(filters).length > 0
        ? {
            $or: [
              ...Object.entries(filters).map((e) =>
                e[0] !== "$or" ? { [e[0]]: e[1] } : {}
              ),
            ],
          }
        : null
    );

    if (internships.length == 0) {
      internships = await Internship.find();
    }

    res.status(200).json(internships);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching internships" });
  }
};

module.exports.addToBookmark = async (req, res) => {
  try {
    const { _id } = req.body;
    const data = await Internship.updateOne({ _id }, { isBookmarked: true });

    return res.status(201).json(data);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports.getBookmarked = async (_req, res) => {
  try {
    const data = await Internship.find({ isBookmarked: { $ne: false } });
    return res.status(200).json(data);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports.getNewest = async (_req, res) => {
  try {
    const data = await Internship.find().sort([['posted', 1]]);
    return res.status(200).json(data);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports.deleteFromBookmark = async (req, res) => {
  try {
    const { _id } = req.query;
    const data = await Internship.updateOne({ _id }, { isBookmarked: false });

    return res.status(201).json(data);
  } catch (error) {
    return res.sendStatus(500);
  }
};
