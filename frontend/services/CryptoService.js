class CryptoService {
    constructor() {
      this.encryptionAlgorithm = {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
        hash: { name: 'SHA-256' },
      };
  
      // Generate a new key pair for encryption/decryption
      this.generateKeyPair();
    }
  
    async generateKeyPair() {
      try {
        this.keyPair = await crypto.subtle.generateKey(
          this.encryptionAlgorithm,
          true,
          ['encrypt', 'decrypt']
        );
      } catch (error) {
        console.error('Key Generation Error:', error);
      }
    }
  
    async encrypt(plaintext, recipientPublicKey) {
      try {
        const encodedMessage = new TextEncoder().encode(plaintext);
        const encryptedMessage = await crypto.subtle.encrypt(
          this.encryptionAlgorithm,
          recipientPublicKey, // Use the provided public key
          encodedMessage
        );
        return new Uint8Array(encryptedMessage);
      } catch (error) {
        console.error('Encryption Error:', error);
        return null;
      }
    }
  
    async decrypt(encryptedData, userPrivateKey) {
      try {
        const decryptedMessage = await crypto.subtle.decrypt(
          this.encryptionAlgorithm,
          userPrivateKey, // Use the provided private key
          encryptedData
        );
        return new TextDecoder().decode(decryptedMessage);
      } catch (error) {
        console.error('Decryption Error:', error);
        return null;
      }
    }
  }
  

  export {CryptoService}