import { type RouteConfig } from "@react-router/dev/routes";
import { 
	index,
	layout,
	route,
} from "@react-router/dev/routes";
import { withAuth } from "./middleware/auth";

export default [
	layout("layouts/topbar.tsx", [
		index("routes/preview.tsx"),
		route("models/:modelId", "routes/model.tsx"),
		route("profile", "routes/profile.tsx"),
		route("login", "routes/login.tsx"),
		route("upload", withAuth("routes/upload.tsx")),
	]),
] satisfies RouteConfig;
