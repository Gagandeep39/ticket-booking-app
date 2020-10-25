/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 17:10:07
 * @modify date 2020-10-22 17:10:07
 * @desc Standardway to provide Global CSS
 */
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
};

/**
 * Hwen there are multiple gtInitialProps, only one is called
 * getInitialProps can be removed from Landing page
 */
AppComponent.getInitialProps = async (appContext) => {
  const { data } = await buildClient(appContext.ctx).get(
    '/api/users/currentuser'
  );
  // Fetch Page props
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
