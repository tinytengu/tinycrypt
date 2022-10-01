import { useState } from "react";
import { Heading, Stack, Flex, Text } from "@chakra-ui/react";
import { NavMenu } from "@/components";
import { TextForm, FileForm } from "@/forms";

import styles from "./App.module.css";

const App = () => {
  const [menuIdx, setMenuIdx] = useState(0);

  return (
    <main className={styles.main}>
      <Stack direction="column" w={["90%", "50%"]} gap="1rem">
        <Flex direction="column" gap=".5rem">
          <Heading textAlign="center">tinycrypt</Heading>
          <Text fontSize="sm" textAlign="center" textColor="gray.500">
            PBKDF2-HMAC-SHA256-AES-GCM encryption
          </Text>
        </Flex>
        {/* Buttons */}
        <Flex justify="center">
          <NavMenu
            items={["Text", "File"]}
            active={menuIdx}
            onClick={setMenuIdx}
          />
        </Flex>
        {/* Form */}
        {menuIdx == 0 ? <TextForm /> : <FileForm />}
      </Stack>
    </main>
  );
};

export default App;
