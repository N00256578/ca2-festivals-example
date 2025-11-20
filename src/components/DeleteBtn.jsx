import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import axios from '@/config/api';
import { toast } from 'sonner';
import { useState } from 'react';

export default function DeleteBtn({ onDeleteCallback, resource, id }) {
  const [isDeleting, setIsDeleting] = useState(false);

  let token = localStorage.getItem('token');

  const deleting = () => {
    toast.warning('Do you want to delete this item?', {
      action: {
        label: 'Delete',
        onClick: onDelete,
      },
      duration: 5000,
      cancel: () => setIsDeleting(false),
    });
  };

  const onDelete = async () => {
    const options = {
      method: 'DELETE',
      url: `/${resource}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log('Attempting to delete:', resource, id);

    try {
      let response = await axios.request(options);
      console.log('Deleted:', response.data);
      if (onDeleteCallback) {
        onDeleteCallback(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return !isDeleting ? (
    <Button
      className="cursor-pointer hover:border-red-700 text-red-500 hover:text-red-700"
      variant="outline"
      size="icon"
      onClick={() => setIsDeleting(true)}
    >
      <Trash2 />
    </Button>
  ) : (
    <>
      <p>Are you sure?</p>
      <Button
        className="cursor-pointer hover:border-red-700 text-red-500 hover:text-red-700"
        variant="outline"
        size="icon"
        onClick={deleting}
      >
        Yes
      </Button>
      <Button
        className="cursor-pointer hover:border-slate-700 text-slate-500 hover:text-slate-700"
        variant="outline"
        size="icon"
        onClick={() => setIsDeleting(false)}
      >
        No
      </Button>
    </>
  );
}
