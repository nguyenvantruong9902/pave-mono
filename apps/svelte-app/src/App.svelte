<script lang="ts">
  import { Input, type InputStatus } from "@pave/web-components";
  import { sveltify } from "svelte-preprocess-react";

  const react = sveltify({ Input });

  const helpText = "You can set help text here";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let status = $state<InputStatus>();
  let help = $state<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const onChangeTesting = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (!email) {
      status = undefined;
      help = undefined;
      return;
    }

    if (!emailRegex.test(email)) {
      status = "error";
      help = "Your email is invalid";
      return;
    }

    if (email.length < 6) {
      status = "warning";
      help = "Your email is too short";
      return;
    }

    if (email.length < 10) {
      status = "info";
      help = "Your email should be at least 10 characters long";
      return;
    }

    status = "success";
    help = "Your email is valid";
  };

  const handleDebounceChange = debounce(onChangeTesting, 500);
</script>

<div class="flex flex-wrap gap-6">
  <react.Input placeholder="Default" />

  <react.Input disabled placeholder="Disabled" />

  <react.Input status="info" name="info" placeholder="Info" help={helpText} />

  <react.Input
    status="warning"
    name="warning"
    placeholder="Warning"
    help={helpText}
  />

  <react.Input
    status="success"
    name="success"
    placeholder="Success"
    help={helpText}
  />

  <react.Input
    status="error"
    name="error"
    placeholder="Error"
    help={helpText}
  />

  <react.Input
    placeholder="For Testing"
    {status}
    name="testing"
    {help}
    onChange={handleDebounceChange}
  />
</div>
