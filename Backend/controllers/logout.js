export const logout = (req, res) => {
  console.log("Logged out successfully");
  

  res.clearCookie("token", { path: "/" });
  res.status(200).json({ success: true });
};




// export const logout =  (req, res) => {
//   console.log("Logged out successfully");
  
//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: false,
//   });

//   res.status(200).json({ message: "Logged out successfully" });
// }