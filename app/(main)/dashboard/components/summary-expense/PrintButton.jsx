import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      className="flex items-center gap-2 text-sm"
    >
      <FiDownload className="w-4 h-4" />
      Print Report
    </Button>
  );
}
