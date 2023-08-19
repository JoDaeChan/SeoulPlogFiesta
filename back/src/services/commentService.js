const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createComment = async (
	postId,
	writerId,
	content,
	parentId,
	isCertPost,
) => {
	let commentData = {
		writer: {
			connect: { id: writerId },
		},
		content,
	};
	if (isCertPost) {
		const certPostExists = await prisma.certPost.findUnique({
			where: { id: postId },
		});
		if (!certPostExists) {
			throw new Error("Cert post not found");
		}
		commentData.certPost = {
			connect: { id: postId },
		};
	} else {
		const postExists = await prisma.post.findUnique({
			where: { id: postId },
		});
		if (!postExists) {
			throw new Error("Post not found");
		}
		commentData.post = {
			connect: { id: postId },
		};
	}
	if (parentId !== undefined && parentId !== null) {
		commentData.parent = {
			connect: { id: parentId },
		};
	}
	try {
		return await prisma.comment.create({
			data: commentData,
		});
	} catch (error) {
		throw error;
	}
};

module.exports = { createComment };