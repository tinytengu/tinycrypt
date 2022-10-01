import { ChangeEvent, useState } from "react";
import { Flex, Stack, Textarea, Button } from "@chakra-ui/react";

// Project
import PasswordInput from "@/components/PasswordInput";
import { encrypt, decrypt } from "@/utils";

const TextForm = () => {
  // State
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState("");

  // Event handlers
  const onClickEncrypt = () => {
    if (text.length == 0 || password.length == 0) {
      alert("Fill required fields");
      return;
    }
    const encrypted = encrypt(text, password);
    setResult(encrypted);
  };

  const onClickDecrypt = () => {
    if (text.length == 0 || password.length == 0) {
      alert("Fill required fields");
      return;
    }
    try {
      const decrypted = decrypt(text, password, "utf8");
      setResult(decrypted);
    } catch (error) {
      alert("Unable to decrypt the content");
      return;
    }
  };

  return (
    <Stack direction="column" gap="1rem">
      <Textarea
        placeholder="Enter text"
        resize="none"
        height="15rem"
        value={text}
        onChange={(e: ChangeEvent) =>
          setText((e.target as HTMLInputElement).value)
        }
      />
      <PasswordInput
        value={password}
        show={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
        onChange={(event) => setPassword(event.target.value)}
      />
      {result.length != 0 ? (
        <Textarea
          placeholder="Результат"
          resize="none"
          variant="filled"
          value={result}
          onChange={() => {}}
        />
      ) : (
        <></>
      )}
      <Flex justify="center" gap="1rem">
        <Button colorScheme="messenger" onClick={onClickEncrypt}>
          Encrypt
        </Button>
        <Button colorScheme="teal" onClick={onClickDecrypt}>
          Decrypt
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextForm;
