import ploService from '../services/ploService.js';

const postPlo = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const certPostData = req.body;
		const createdCertPost = await ploService.createCertPost(
			userId,
			certPostData,
		);
		console.log(createdCertPost);
		res.status(201).json(createdCertPost);
	} catch (error) {
		console.error(error);
		res.status(500);
		next(error);
	}
};

const getAllCertPosts = async (req, res, next) => {
	try {
		const certPosts = await ploService.getAllCertPosts();
		console.log(certPosts);
		res.status(200).json(certPosts);
	} catch (error) {
		console.error(error);
		res.status(500);
		next(error);
	}
};

const getCertPost = async (req, res, next) => {
	try {
		const certPostId = parseInt(req.params.postid);
		const detailedCertPost = await ploService.getCertPostDetails(certPostId);
		console.log(detailedCertPost);
		res.status(200).json(detailedCertPost);
	} catch (error) {
		console.error(error);
		res.status(500);
		next(error);
	}
};

const updateCertPost = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const certPostId = parseInt(req.params.postid);
		const updatedFields = req.body;

		const updatedCertPost = await ploService.updateCertPost(
			userId,
			certPostId,
			updatedFields,
		);
		//todo
		if (!updatedCertPost) {
			return res.status(403).json({ message: '권한 없음' });
		}

		res.status(200).json(updatedCertPost);
	} catch (error) {
		console.error(error);
		res.status(500);
		next(error);
	}
};

module.exports = { postPlo, getAllCertPosts, getCertPost, updateCertPost };