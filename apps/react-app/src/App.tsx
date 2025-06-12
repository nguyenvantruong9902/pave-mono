import { Input, type InputStatus } from "@pave/web-components";
import { useState } from "react";

const helpText = "You can set help text here";

const passwordRegex = {
  onlyNumber: /[0-9]/,
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
    <div className="flex flex-wrap gap-6">
      <Input placeholder="Default" />

      <Input disabled placeholder="Disabled" />

      <Input status="info" name="info" placeholder="Info" help={helpText} />

      <Input
        status="warning"
        name="warning"
        placeholder="Warning"
        help={helpText}
      />

      <Input
        status="success"
        name="success"
        placeholder="Success"
        help={helpText}
      />

      <Input status="error" name="error" placeholder="Error" help={helpText} />

      <Input
        type="password"
        placeholder="For Testing"
        status={status}
        name="testing"
        help={help}
        onChange={handleDebounceChange}
      />
    </div>
  );
}

export default App;
