<script lang="ts">
  import { Input, type InputStatus } from "@pave/web-components";
  import { sveltify } from "svelte-preprocess-react";

  import "./app.css";

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

<div class="app">
  <div class="container">
    <react.Input label="Default" placeholder="Default" />

    <react.Input
      readOnly
      name="readonly"
      label="Readonly"
      placeholder="Readonly"
    />

    <react.Input
      disabled
      name="disabled"
      label="Disabled"
      placeholder="Disabled"
    />

    <react.Input
      status="info"
      name="info"
      label="Info"
      placeholder="Info"
      help={helpText}
    />

    <react.Input
      status="warning"
      name="warning"
      label="Warning"
      placeholder="Warning"
      help={helpText}
    />

    <react.Input
      status="success"
      name="success"
      label="Success"
      placeholder="Success"
      help={helpText}
    />

    <react.Input
      status="error"
      name="error"
      label="Error"
      placeholder="Error"
      help={helpText}
    />

    <react.Input
      {status}
      name="testing"
      label="Email"
      placeholder="Enter your email"
      {help}
      onChange={handleDebounceChange}
    />
  </div>
</div>
