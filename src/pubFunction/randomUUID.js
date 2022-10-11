// random uuid generate

const randomUUID = () => {
  /* Assuming that self.crypto.randomUUID() is available */
  return self.crypto.randomUUID();
};

export default randomUUID;
