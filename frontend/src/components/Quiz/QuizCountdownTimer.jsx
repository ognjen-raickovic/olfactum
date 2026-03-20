// import { useState, useEffect } from "react";
// import { Box, Typography, Alert } from "@mui/material";
// import { HourglassEmpty, Schedule } from "@mui/icons-material";

// const QuizCountdownTimer = ({ expiryTimestamp, onExpire }) => {
//   const getTimeLeft = () => {
//     const now = Date.now();
//     const diff = expiryTimestamp - now;

//     if (diff <= 0) return { expired: true };

//     return {
//       hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((diff / (1000 * 60)) % 60),
//       seconds: Math.floor((diff / 1000) % 60),
//       expired: false,
//     };
//   };

//   // IMPORTANT: Only calculate once on mount
//   const [timeLeft, setTimeLeft] = useState(getTimeLeft);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTime = getTimeLeft();

//       if (newTime.expired) {
//         clearInterval(interval);
//         setTimeLeft(newTime);
//         onExpire(); // <--- This always fires correctly!
//       } else {
//         setTimeLeft(newTime);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [expiryTimestamp, onExpire]);

//   if (timeLeft.expired) {
//     return (
//       <Alert severity="warning" icon={<HourglassEmpty />} sx={{ mb: 3 }}>
//         Your quiz results have expired. Please retake the quiz for fresh
//         recommendations.
//       </Alert>
//     );
//   }

//   const fmt = (v) => v.toString().padStart(2, "0");

//   return (
//     <Box
//       sx={{
//         bgcolor: "primary.main",
//         color: "white",
//         p: 2,
//         borderRadius: 2,
//         mb: 3,
//         textAlign: "center",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 2,
//         flexWrap: "wrap",
//       }}
//     >
//       <Schedule sx={{ fontSize: 24 }} />
//       <Typography variant="body1" sx={{ fontWeight: 500 }}>
//         Quiz results expire in:
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           gap: 1,
//           alignItems: "center",
//           bgcolor: "rgba(255,255,255,0.2)",
//           px: 2,
//           py: 1,
//           borderRadius: 1,
//           fontFamily: "monospace",
//           fontSize: "1.2rem",
//           fontWeight: "bold",
//         }}
//       >
//         <span>{fmt(timeLeft.hours)}</span>:<span>{fmt(timeLeft.minutes)}</span>:
//         <span>{fmt(timeLeft.seconds)}</span>
//       </Box>
//     </Box>
//   );
// };

// export default QuizCountdownTimer;
