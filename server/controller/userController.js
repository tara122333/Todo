exports.getUserDetails = async (req, res) => {
    try {
        return res.status(200).json({
            user: req.session.passport.user._doc.fullname, status: "success"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};