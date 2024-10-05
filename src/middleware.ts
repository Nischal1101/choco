import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        token?.role === "admin";
      } else {
        return true;
      }
    },
  },
});
export const config = {
  matcher: ["/admin(.*)?"],
};
