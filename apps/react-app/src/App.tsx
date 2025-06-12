import { Input, type InputStatus } from "@pave/web-components";
import { useState } from "react";

import "./app.css";

const helpText = "You can set help text here";

const passwordRegex = {
  onlyNumber: /\d/,
  onlyLowercase: /[a-z]/,
  onlyUppercase: /[A-Z]/,
  onlySpecial: /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/,
};

function App() {
  const [status, setStatus] = useState<InputStatus>();
  const [help, setHelp] = useState<string>();

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
    const password = e.target.value;
    const passwordLength = password.length;

    const hasLowerCase = passwordRegex.onlyLowercase.test(password);
    const hasUpperCase = passwordRegex.onlyUppercase.test(password);
    const hasDigit = passwordRegex.onlyNumber.test(password);
    const hasSpecial = passwordRegex.onlySpecial.test(password);

    const complexityCount = [
      hasLowerCase,
      hasUpperCase,
      hasDigit,
      hasSpecial,
    ].filter(Boolean).length;

    if (passwordLength === 0) {
      setHelp(undefined);
      setStatus(undefined);
      return;
    }

    if (passwordLength < 6 || complexityCount < 2) {
      setHelp("Your password is very weak");
      setStatus("error");
      return;
    }

    if (passwordLength < 8 || complexityCount < 4) {
      setHelp("Your password is weak");
      setStatus("error");
      return;
    }

    if (passwordLength < 10) {
      setHelp("Your password is medium");
      setStatus("warning");
      return;
    }

    if (passwordLength < 12) {
      setHelp(
        "A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols"
      );
      setStatus("info");
      return;
    }

    setHelp("Your password is strong");
    setStatus("success");
  };

  const handleDebounceChange = debounce(onChangeTesting, 500);

  return (
    <div className="app">
      <div className="container">
        <Input label="Default" placeholder="Default" />

        <Input
          readOnly
          name="readonly"
          label="Readonly"
          placeholder="Readonly"
        />

        <Input
          disabled
          name="disabled"
          label="Disabled"
          placeholder="Disabled"
        />

        <Input
          status="info"
          name="info"
          label="Info"
          placeholder="Info"
          help={helpText}
        />

        <Input
          status="warning"
          name="warning"
          label="Warning"
          placeholder="Warning"
          help={helpText}
        />

        <Input
          status="success"
          name="success"
          label="Success"
          placeholder="Success"
          help={helpText}
        />

        <Input
          status="error"
          name="error"
          label="Error"
          placeholder="Error"
          help={helpText}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          status={status}
          name="testing"
          help={help}
          onChange={handleDebounceChange}
        />
      </div>
    </div>
  );
}

export default App;
