import { Input } from '@/registry/default/ui/input';

export default function InputDemo() {
  return (
    <div className="w-80">
      <Input type="text" placeholder="Readonly" readOnly={true} value="Readonly input" />
    </div>
  );
}
