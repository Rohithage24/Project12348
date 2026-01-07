
export const logout =  (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: false,
  });

  res.status(200).json({ message: "Logged out successfully" });
}