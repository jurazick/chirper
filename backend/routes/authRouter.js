import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/me", (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            authenticated: false,
        });
    }

    res.json(req.user);
});

router.post("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json(err);
        }

        req.session.destroy(() => {
            res.json({
                success: true,
            });
        });
    });
});

router.get(
    "/github",
    passport.authenticate("github", {
        scope: ["user:email"],
    }),
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login",
    }),
    (req, res) => {
        res.redirect("http://localhost:3000");
    },
);

export default router;
