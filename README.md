# tinycrypt

![Preview](https://i.imgur.com/pmXdB2T.png)

This is an implementation of `PBKDF2-HMAC-SHA256-AES-GCM` encryption as a SPA made with [React.js](https://reactjs.org), [Chakra UI](https://chakra-ui.com), [Forge](https://github.com/digitalbazaar/forge) and [TypeScript](https://www.typescriptlang.org/).

## Details

From the name (_which is quite long_), it uses the most popular key derivation function - PBKDF2 alongside with HMAC and SHA256 (_5000 iterations_) to derive 256-bit-long encryption key which is used in AES-GCM cipher later. The product of `encrypt` function is base64-encoded string (omit spaces): `mac(tag) salt iv ciphertext`

| Part       | Length (base64, chars) |
| ---------- | ---------------------- |
| MAC        | 24                     |
| Salt       | 44                     |
| IV         | 44                     |
| Ciphertext | \*                     |

Hence, for decryption, one must extract the mentioned parts from the encrypted string, decode them from base64 and then use resulting data in the decryption process.

### Example Python implementation

```python
from base64 import b64decode
from hashlib import pbkdf2_hmac

from Cryptodome.Cipher import AES

encrypted = "3wVs6d7tOKl3acE8gfwvWw==/gQ6Xs7Di2BEFDJsAodnX3eQOXh9MOjmxNygiU81Ge0=jgLtCWt85LMuB+xJikCPu3cREHBwIbwqMgdFa31oFq8=58TUlUHCxzWijq4cQh1RWA=="

tag = encrypted[:24]
salt = encrypted[24:68]
iv = encrypted[68:112]
ciphertext = encrypted[112:]
password = "password"

cipher = AES.new(
    pbkdf2_hmac("sha256", password.encode(), b64decode(salt), 5000),
    AES.MODE_GCM,
    nonce=b64decode(iv),  # It's called nonce for whatever reason, afaik, IV and Nonce aren't the same but ok, I guess
)
decrypted = cipher.decrypt_and_verify(
    b64decode(ciphertext),
    b64decode(tag),
)

print("Decrypted:", decrypted.decode())

```

## License

[GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.html)
