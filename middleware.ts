// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware()

// export const config = {
//     // matcher: ["/((?!.*\\..*|_next).*", "/", "/(api|trpc)(.*)"]
//     matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/api/:path*"]
    // publicRoutes: ['/', '/api/webhook/clerk', "/api/:path*"],
    // ignoredRoutes: ['/api/webhook/clerk'],
    // ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/*/billboards/new"]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};  