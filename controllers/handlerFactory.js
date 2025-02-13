
exports.deleteOne = Model => async (req, res) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.status(401).json({ success: false, message: 'No Document of that ID' });
    }

    res.status(204).json({
      success: true,
      message:"Deleted Successfully",
      doc
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.updateOne = Model => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
     return  res.status(400).json({
        success: false,
        
        message: "No Doc found"
      });
    }

    return res.status(200).json({
      success: true,
        doc
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.createOne = Model => async (req, res) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({
      success: true,
      message:"Created Successfully",
      doc
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.getOne = (Model, pops) => async (req, res) => {
  let query = Model.findById(req.params.id);
  if (pops) query = query.populate(pops);
  const doc = await query;

  if (!doc) {
    return res.status(400).json({
      success: false,
      message: "No doc found"
    });
  }

  res.status(200).json({
    success: true,
    data: {
      doc
    }
  });
};

exports.getAll = Model => async (req, res) => {
  // to allow for nested GET reviews on tour
  // let filter = {};
  // if (req.params.tourId) filter = { tour: req.params.tourId };

  // const features = new APIFeatures(Model.find(filter), req.query)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();
  // const doc = await features.query;

  // SEND RESPONSE

  try{
    const doc=await Model.find()
    res.status(200).json({
      success: true,
      results: doc.length,
      message:'Data Fetched Successfully',
      doc
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
