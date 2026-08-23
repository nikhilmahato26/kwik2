import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
})

export const config = {
  // Matches /admin and all subpaths except /admin/login
  matcher: ["/admin", "/admin/((?!login).*)"]
}
