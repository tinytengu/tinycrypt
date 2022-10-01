import forge from "node-forge";

export function downloadBytes(
  fileName: string,
  byte: ArrayBuffer | string,
  mimeType = "text/plain"
) {
  const blob = new Blob([byte], { type: mimeType });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  link.remove();
}

export function stringToArrayBuffer(str: string): ArrayBuffer {
  const buffer = new ArrayBuffer(str.length);
  const bufferView = new Uint8Array(buffer);

  for (let i = 0; i < str.length; i++) {
    bufferView[i] = str.charCodeAt(i);
  }

  return buffer;
}

export function encrypt(
  content: string | ArrayBuffer,
  password: string,
  encoding: forge.Encoding = "utf8"
): string {
  const salt = forge.random.getBytesSync(32);
  const iv = forge.random.getBytesSync(32);

  const derivedKey = forge.pkcs5.pbkdf2(
    password,
    salt,
    5000,
    32,
    forge.md.sha256.create()
  );

  const cipher = forge.cipher.createCipher("AES-GCM", derivedKey);
  cipher.start({
    iv: iv,
  });
  cipher.update(forge.util.createBuffer(content, encoding));
  cipher.finish();

  return (
    window.btoa(cipher.mode.tag.bytes()) +
    window.btoa(salt) +
    window.btoa(iv) +
    window.btoa(cipher.output.bytes())
  );
}

export function decrypt(
  content: string,
  password: string,
  encoding: forge.Encoding = "raw"
): string {
  const tag = content.substring(0, 24);
  const salt = content.substring(24, 68);
  const iv = content.substring(68, 112);
  const ciphertext = content.substring(112);

  const derivedKey = forge.pkcs5.pbkdf2(
    password,
    window.atob(salt),
    5000,
    32,
    forge.md.sha256.create()
  );

  const decipher = forge.cipher.createDecipher("AES-GCM", derivedKey);
  decipher.start({
    iv: window.atob(iv),
    tag: forge.util.createBuffer(window.atob(tag)),
  });
  decipher.update(forge.util.createBuffer(window.atob(ciphertext), encoding));
  if (!decipher.finish()) {
    throw Error("Unable to decrypt the content");
  }

  return encoding == "raw" ? decipher.output.data : decipher.output.toString();
}
