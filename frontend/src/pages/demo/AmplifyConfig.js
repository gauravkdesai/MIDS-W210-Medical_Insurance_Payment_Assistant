import Amplify, { API } from 'aws-amplify';

const awsAPIconfig= Amplify.configure({
    API: {
        endpoints: [
            {
                name: "MBVAModelAPI",
                endpoint: "http://54.202.117.250:5000"
            }
        ]
    }
});

export default awsAPIconfig;