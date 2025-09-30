import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CircleEllipsis,
  Shield,
  SquircleDashed,
  SunDim,
  TriangleAlert,
} from 'lucide-react';

const iconMap: Record<string, React.ReactElement> = {
  LOW: <SunDim size={15} className="text-blue-400" />,
  MEDIUM: <CircleEllipsis size={15} className="text-yellow-500" />,
  HIGH: <TriangleAlert size={15} className="text-red-500" />,
  NONE: <SquircleDashed size={15} className="text-white" />,
};

const Priority = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const currentIcon = iconMap[value] || <Shield size={15} />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="linear">
          {currentIcon} {value || 'Priority'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          {Object.entries(iconMap).map(([key, icon]) => (
            <DropdownMenuItem key={key} onClick={() => onChange(key)}>
              {icon} {key.charAt(0) + key.slice(1).toLowerCase()}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Priority;
