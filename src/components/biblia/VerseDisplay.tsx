import { memo } from 'react';

interface VerseDisplayProps {
  number: number;
  text: string;
}

const VerseDisplay = memo(function VerseDisplay({
  number,
  text,
}: VerseDisplayProps) {
  return (
    <p id={`verse-${number}`} className="mb-3 leading-relaxed">
      <sup className="mr-1 text-accent font-medium">{number}</sup>
      <span className="font-serif text-primary/90">{text}</span>
    </p>
  );
});

export default VerseDisplay;
