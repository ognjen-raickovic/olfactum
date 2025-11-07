// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   useTheme,
//   Divider,
//   alpha,
// } from "@mui/material";

// const HomeStats = () => {
//   const theme = useTheme();

//   const stats = [
//     {
//       number: "26,000+",
//       label: "Curated Fragrances",
//       description: "Explore our extensive collection from niche to designer",
//     },
//     {
//       number: "6",
//       label: "Learning Modules",
//       description: "Master fragrance knowledge step by step",
//     },
//     {
//       number: "🎯",
//       label: "Smart Quiz",
//       description: "Find your perfect match in 2 minutes",
//     },
//     {
//       number: "∞",
//       label: "Possibilities",
//       description: "Endless discovery with personalized recommendations",
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         background: (theme) =>
//           `linear-gradient(135deg, ${alpha(
//             theme.palette.background.default,
//             0.6
//           )} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
//         py: 8,
//         borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//         borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//       }}
//     >
//       <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
//         {/* Section Header */}
//         <Box sx={{ textAlign: "center", mb: 6 }}>
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: 700,
//               mb: 2,
//               background: (theme) =>
//                 `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               color: "transparent",
//             }}
//           >
//             Discover More
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               color: "text.secondary",
//               fontWeight: 300,
//               maxWidth: 600,
//               mx: "auto",
//             }}
//           >
//             Everything you need to start your fragrance journey in one place
//           </Typography>
//         </Box>

//         {/* Stats Grid */}
//         <Grid
//           container
//           spacing={4}
//           alignItems="stretch"
//           justifyContent="center"
//         >
//           {stats.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Box
//                 sx={{
//                   textAlign: "center",
//                   p: 3,
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   transition: "all 0.3s ease",
//                   borderRadius: 2,
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     bgcolor: alpha(theme.palette.primary.main, 0.02),
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="h1"
//                   sx={{
//                     fontWeight: 700,
//                     color: "primary.main",
//                     mb: 1,
//                     fontSize: { xs: "2.5rem", md: "3.5rem" },
//                     lineHeight: 1,
//                   }}
//                 >
//                   {stat.number}
//                 </Typography>
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontWeight: 600,
//                     color: "text.primary",
//                     mb: 1,
//                     fontSize: { xs: "1.1rem", md: "1.25rem" },
//                   }}
//                 >
//                   {stat.label}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: "text.secondary",
//                     lineHeight: 1.4,
//                   }}
//                 >
//                   {stat.description}
//                 </Typography>
//               </Box>

//               {/* Vertical dividers between items on desktop */}
//               {index < stats.length - 1 && (
//                 <Divider
//                   orientation="vertical"
//                   sx={{
//                     height: 80,
//                     display: { xs: "none", md: "block" },
//                     mx: "auto",
//                   }}
//                 />
//               )}
//             </Grid>
//           ))}
//         </Grid>

//         {/* Call to Action */}
//         <Box sx={{ textAlign: "center", mt: 6, pt: 4 }}>
//           <Typography
//             variant="h6"
//             sx={{
//               color: "text.secondary",
//               fontWeight: 300,
//               fontStyle: "italic",
//               maxWidth: 500,
//               mx: "auto",
//             }}
//           >
//             "From complete beginner to fragrance connoisseur – we guide your
//             entire journey"
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default HomeStats;
