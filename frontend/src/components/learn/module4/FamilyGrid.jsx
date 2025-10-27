// import {
//   Grid,
//   Container,
//   Typography,
//   Box,
//   useTheme,
//   alpha,
// } from "@mui/material";
// import FamilyCard from "./FamilyCard";
// import { fragranceFamilies } from "./fragranceFamiliesData";

// export default function FamilyGrid({ onFragranceClick }) {
//   const theme = useTheme();

//   return (
//     <Container maxWidth="lg" sx={{ py: 2 }}>
//       <Box sx={{ textAlign: "center", mb: 4 }}>
//         <Typography
//           variant="h4"
//           component="h2"
//           gutterBottom
//           sx={{
//             fontWeight: "bold",
//             color: "text.primary",
//           }}
//         >
//           Family Details
//         </Typography>
//         <Typography
//           variant="body1"
//           color="text.secondary"
//           sx={{
//             maxWidth: 600,
//             mx: "auto",
//           }}
//         >
//           Expand each family card to discover sub-categories, key notes, and
//           popular fragrances
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {fragranceFamilies.map((family) => (
//           <Grid item key={family.id} xs={12} md={6}>
//             <FamilyCard family={family} onFragranceClick={onFragranceClick} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Quick Stats */}
//       <Box
//         sx={{
//           mt: 6,
//           p: 3,
//           borderRadius: 2,
//           backgroundColor: alpha(theme.palette.primary.main, 0.05),
//           border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//           textAlign: "center",
//         }}
//       >
//         <Grid container spacing={3} justifyContent="center">
//           <Grid item xs={6} sm={3}>
//             <Typography variant="h4" color="primary.main" fontWeight="bold">
//               6
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Main Families
//             </Typography>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <Typography variant="h4" color="secondary.main" fontWeight="bold">
//               {fragranceFamilies.reduce(
//                 (acc, family) => acc + family.subFamilies.length,
//                 0
//               )}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Sub-Categories
//             </Typography>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <Typography variant="h4" color="success.main" fontWeight="bold">
//               {fragranceFamilies.reduce(
//                 (acc, family) =>
//                   acc +
//                   family.subFamilies.reduce(
//                     (subAcc, sub) => subAcc + (sub.examples?.length || 0),
//                     0
//                   ),
//                 0
//               )}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Popular Scents
//             </Typography>
//           </Grid>
//           <Grid item xs={6} sm={3}>
//             <Typography variant="h4" color="warning.main" fontWeight="bold">
//               30+
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Key Notes
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }
