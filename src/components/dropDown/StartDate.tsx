'use client';

import * as React from 'react';
import { CalendarArrowUp, ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const StartDate = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
}) => {
  const [open, setOpen] = React.useState(false);

  const parsedDate = value ? new Date(value) : undefined;

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="linear" id="date">
            <CalendarArrowUp size={15} />
            {parsedDate ? parsedDate.toLocaleDateString() : 'Start date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={parsedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date) {
                onChange(date.toISOString());
              } else {
                onChange(null);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StartDate;
