import {authMiddleware} from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-up",
    "/api/uploadthing",
    "/api/courses/all",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
