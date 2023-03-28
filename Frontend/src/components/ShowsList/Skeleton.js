import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonCard() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "grey.900" }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton
        variant="circular"
        sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
        width={40}
        height={40}
      />
      <Skeleton
        variant="rectangular"
        sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
        width={210}
        height={60}
      />
      <Skeleton
        variant="rounded"
        sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
        width={210}
        height={60}
      />
    </Stack>
  );
}
