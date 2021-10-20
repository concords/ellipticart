export function addNewLines(str) {
  var finalString = "";
  while (str.length > 0) {
    finalString += str.substring(0, 64) + "\n";
    str = str.substring(64);
  }
  return finalString;
}

export function removeLines(str) {
  return str.replace("\n", "");
}

export function arrayBufferToBase64(arrayBuffer) {
  var byteArray = new Uint8Array(arrayBuffer);
  var byteString = "";
  for (var i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  var b64 = window.btoa(byteString);

  return b64;
}

export function base64ToArrayBuffer(b64) {
  var byteString = window.atob(b64);
  var byteArray = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return byteArray;
}

export function b64encode(buf) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
}

export function b64decode(str) {
  var binary_string = window.atob(str);
  var len = binary_string.length;
  var bytes = new Uint8Array(new ArrayBuffer(len));
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

export async function importPrivateKeyFromPem(key) {
  const b64key = key
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "");

  return window.crypto.subtle.importKey(
    "pkcs8",
    base64ToArrayBuffer(removeLines(b64key)),
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["sign"]
  );
}

export function formatPublicKeyPem(b64) {
  return `-----BEGIN PUBLIC KEY-----\n${addNewLines(b64)}-----BEGIN PUBLIC KEY-----`;
}

export async function publicJwkToPem(key) {
  const exported = await window.crypto.subtle.exportKey("spki", key);
  return b64encode(exported);
}

export async function exportPublicKey(privateKey) {
  const { x, y } = await crypto.subtle.exportKey("jwk", privateKey);
  const publicKey = await crypto.subtle.importKey(
      "jwk",
      {
          crv: "P-256",
          ext: true,
          kty: "EC",
          x,
          y,
      },
      {
          name: "ECDSA",
          namedCurve: "P-256",
      },
      true,
      ["verify"]
  );
  return publicJwkToPem(publicKey);
}