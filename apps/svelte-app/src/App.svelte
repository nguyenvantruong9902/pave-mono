<script lang="ts">
  import { Input } from "@pave/web-components";
  import { sveltify } from "svelte-preprocess-react";

  const react = sveltify({ Input });
</script>

<react.Input placeholder="Input" />
