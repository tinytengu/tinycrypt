import { ChangeEvent, useState } from "react";
import { Flex, Stack, Button } from "@chakra-ui/react";

// Project
import PasswordInput from "@/components/PasswordInput";
import { downloadBytes, stringToArrayBuffer, encrypt, decrypt } from "@/utils";

const TextForm = () => {
  // State
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Event handlers
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target!.files![0]);
  };

  const onClickEncrypt = () => {
    if (!file || password.length == 0) {
      alert("Fill required fields");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      const encrypted = encrypt(reader.result!, password, "raw");
      downloadBytes(`${file.name}.encr`, encrypted);
    };
  };

  const onClickDecrypt = () => {
    if (!file || password.length == 0) {
      alert("Fill required fields");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      let content = "";

      new Uint8Array(reader.result as ArrayBuffer).forEach((code) => {
        content += String.fromCharCode(code);
      });

      try {
        const decrypted = decrypt(content, password, "raw");
        downloadBytes(
          file.name.replace(".encr", ""),
          stringToArrayBuffer(decrypted),
          "text/plain"
        );
      } catch (error) {
        alert("Unable to decrypt the content");
        return;
      }
    };
  };

  return (
    <Stack direction="column" gap="1rem">
      <input type="file" onChange={onFileChange} />
      <PasswordInput
        value={password}
        show={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
        onChange={(event) => setPassword(event.target.value)}
      />
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
