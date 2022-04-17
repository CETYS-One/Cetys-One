module.exports = ({ env }) => ({
  upload: {
    provider: "firebase-storage",
    providerOptions: {
      serviceAccount: require("../cetys-one-firebase-adminsdk-m761t-d99cf7c278.json"),
      bucketUrl: env("STORAGE_BUCKET_URL"),
      uploadOptions: {},
      deleteOptions: {},
    },
  },
});
