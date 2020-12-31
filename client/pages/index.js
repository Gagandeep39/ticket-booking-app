/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 14:16:03
 * @modify date 2020-10-22 14:16:03
 * @desc Starting point
 */
const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>{currentUser ? 'You are Signed In' : 'You are not Signed In'}</h1>;
};

/**
 * Axios code will fail in below code
 * 1. Local host is the Gateway IP of kubernetes
 * 2. NextJS runs inside Kubernetes
 * 3. Different services have dynamic IPs in it
 * 4. When rquest is made from outside Kubernetes, proper mapping is performed by gateway
 * 5. When request is made from inside, no interaction is done with gateway, the client doesn;t know who must recieve this request
 * --------------------------------
 * When the method is called on server, it recieves a prop named req which contains all request data
 * It can be used to fetch cookie and set header for response
 */
LandingPage.getInitialProps = async (context, client, currentUser) => {
  // const { data } = await buildClient(context).get('/api/users/currentuser');
  // console.log(data);
  // return data;
  return {};
};

export default LandingPage;
