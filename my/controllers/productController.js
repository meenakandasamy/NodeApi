exports.getproducts = (req, res, next) => {
    console.log('getproducts route hit');
    res.json({
        success: true,
        message: 'product works!'
    });
};

exports.getsingleproduct = (req, res, next) => {
    const { id } = req.params;
    res.json({
        success: true,
        message: `Product with ID: ${id}`
    });
};