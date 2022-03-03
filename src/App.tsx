import MaterialPriceInput from './components/MaterialPriceInput';
import MaterialSelect from './components/MaterialSelect';
import MyStats from './components/MyStats';
import ShowCalculatedResults from './components/ShowCalculatedResults';
// import MaterialSelect from './components/materialSelect';

function App() {
  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-2xl mb-8'>오레하 계산기</h1>
      {/* <MaterialSelect /> */}
      <div className='flex justify-between gap-x-10'>
        <MaterialPriceInput />
        <MaterialSelect />
        <MyStats />
      </div>

      <div className='container mx-auto p-4 max-w-full mt-12'>
        <ShowCalculatedResults />
      </div>
    </div>
  );
}

export default App;
