'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { AddEmployeeForm } from './AddEmployeeForm';

interface AddEmployeeDialogProps {
  onAdd: (employee: any) => void;
}
export function AddEmployeeDialog({ onAdd }: AddEmployeeDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white  px-7 py-6 rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2 border-b-4 border-blue-800">
          <Plus className="h-5 w-5" strokeWidth={2.5} />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      )}
      <DialogContent className="max-w-[1200px] bg-white  border-none shadow-2xl p-0 overflow-hidden gap-0 rounded-[2rem]">
        <AddEmployeeForm
          onClose={() => setOpen(false)}
          onAdd={(emp) => {
            onAdd(emp);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
