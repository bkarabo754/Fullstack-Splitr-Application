import { BarLoader } from 'react-spinners';

const LoadingIndicator = () => {
  return (
    <div className="container mx-auto py-20">
      <BarLoader width={'100%'} color="#14b8a6" />
    </div>
  );
};

export default LoadingIndicator;
