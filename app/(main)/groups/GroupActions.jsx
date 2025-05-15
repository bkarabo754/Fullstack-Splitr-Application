import { Share2, ArrowLeftRight, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function GroupActions({ groupId, onBack }) {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/groups/${groupId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Group link copied to clipboard!');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 flex-wrap mb-6">
      <Button
        variant="outline"
        onClick={handleShare}
        className="cursor-pointer"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button asChild variant="outline">
        <Link href={`/settlements/group/${groupId}`}>
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Settle Up
        </Link>
      </Button>
      <Button asChild>
        <Link href={`/expenses/new?groupId=${groupId}`}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Link>
      </Button>
    </div>
  );
}
