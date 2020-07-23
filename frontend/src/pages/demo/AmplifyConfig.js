import Amplify from "aws-amplify";

const awsAPIconfig = Amplify.configure({
  API: {
    endpoints: [
      {
        name: "MBVAModelAPI",
        endpoint: "http://34.215.114.239:5000",
      },
      {
        name: "MBVAModelAPIProxy",
        endpoint: "https://leob8b1g7b.execute-api.ap-south-1.amazonaws.com",
      },
    ],
  },
});

export default awsAPIconfig;
