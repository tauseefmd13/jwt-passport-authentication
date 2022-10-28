export const me = (req, res) => {
	return res.json({ success: true, message: "Data found.", data: req.user });
};
