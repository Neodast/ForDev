import Footer from '../Footer/Footer';
import Page from '../Forms/Page';
import Header from '../Header/Header';

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header></Header>
      <Page></Page>
      <Footer></Footer>
    </div>
  );
}
