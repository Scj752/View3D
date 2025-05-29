import { type RouteConfig } from "@react-router/dev/routes";
import { 
	index,
	layout,
	route,
} from "@react-router/dev/routes"

export default [
	layout("layouts/topbar.tsx", [
		index("routes/preview.tsx"),
		route("models/:modelId", "routes/model.tsx"),
	]),
] satisfies RouteConfig;
