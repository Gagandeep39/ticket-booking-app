import axios from 'axios';

/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 14:16:03
 * @modify date 2020-10-22 14:16:03
 * @desc Starting point
 */
const LandingPage = ({ color }) => {
  // console.log(color);
  // axios.get('/api/users/currentUser').then((response) => {
  //   console.log(response.data);
  // });

  return <h1>Landing Page</h1>;
};

/**
 * Axios code will fail in below code
 * 1. Local host is the Gateway IP of kubernetes
 * 2. NextJS runs inside Kubernetes
 * 3. Different services have dynamic IPs in it
 * 4. When rquest is made from outside Kubernetes, proper mapping is performed by gateway
 * 5. When request is made from inside, no interaction is done with gateway, the client doesn;t know who must recieve this request
 */
LandingPage.getInitialProps = async () => {
  // Endsup with error
  // const response = await axios.get('/api/users/currentUser');
  return { color: 'red' };
};

export default LandingPage;
