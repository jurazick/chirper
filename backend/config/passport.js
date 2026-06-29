import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            // Normally you'd look up or create the user here.

            const user = {
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                avatar: profile.photos[0]?.value,
            };

            return done(null, user);
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
