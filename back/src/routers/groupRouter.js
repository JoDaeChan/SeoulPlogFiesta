import router from "express";
import authenticateJWT from "../middlewares/authenticateJWT";
import groupController from "../controllers/groupController";
const groupRouter = router();

groupRouter
	.post("/group", authenticateJWT, groupController.createGroup)
	.get(groupController.getAllGroups);

groupRouter
	.post("/group/join/:groupid", groupController.requestToJoinGroup)
	.get("/group/join/:groupid", groupController.getGroupJoinRequests);

groupRouter.post(
	"/group/approve/:groupid/:userid",
	groupController.approveRegistration,
);

groupRouter.delete(
	"/group/reject/:groupid/:userid",
	groupController.rejectGroupJoinRequest,
);

groupRouter.get("/group/:groupid", groupController.getGroupDetails);

groupRouter.get("/group/list", groupController.getUserGroups);

groupRouter.get("/group/random", groupController.getRandomGroups);

groupRouter.get("/group/:groupname", groupController.searchGroupsByName);

groupRouter
	.post("/group/post", groupController.createPost)
	.get(groupController.getAllPosts);

groupRouter
	.get("/group/post/:postid", groupController.getPostById)
	.put(groupController.editPost)
	.delete(groupController.deletePost);

groupRouter.post("/group/comment", groupController.createComment);
groupRouter
	.put("/group/comment/:commentid", groupController.editComment)
	.delete(groupController.deleteComment);

groupRouter.delete("/group/:groupid", groupController.leaveGroup);

groupRouter.delete(
	"/group/:groupid/:userid",
	groupController.removeGroupMember,
);

groupRouter.delete("/group/drop/:groupid", groupController.dropGroup);

module.exports = groupRouter;
