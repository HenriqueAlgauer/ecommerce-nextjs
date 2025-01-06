// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware()

// export const config = {
//     // matcher: ["/((?!.*\\..*|_next).*", "/", "/(api|trpc)(.*)"]
//     matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/api/:path*"]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};  