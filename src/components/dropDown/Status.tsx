import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowDownWideNarrow,
  ChartNoAxesColumn,
  CircleCheckBig,
  CircleEllipsis,
  CircleOff,
  LandPlot,
} from 'lucide-react';

const IconMap: Record<string, React.ReactElement> = {
  Done: <CircleCheckBig size={15} className="text-green-400" />,
  'In progress': <CircleEllipsis size={15} className="text-blue-400" />,
  Planned: <LandPlot size={15} className="text-yellow-500" />,
  BACKLOG: <ArrowDownWideNarrow size={15} className="text-orange-500" />,
  Canceled: <CircleOff size={15} className="text-red-500" />,
};

const Status = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const currentIcon = IconMap[value] || <ChartNoAxesColumn size={15} />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="linear">
          {currentIcon} {value || 'Status'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {Object.entries(IconMap).map(([key, icon]) => (
            <DropdownMenuItem key={key} onClick={() => onChange(key)}>
              {icon} {key.charAt(0) + key.slice(1).toLowerCase()}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem> </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Status;
