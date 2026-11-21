import React from 'react';
import { staffById, getTeamColorClasses } from '../data/dvkhData';

interface PersonLinkProps {
  id: string;
  label?: string;
  selectedId?: string | null;
  onSelect: (id: string) => void;
  showPlanningTag?: boolean;
  className?: string;
  invert?: boolean;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  id,
  label,
  selectedId,
  onSelect,
  showPlanningTag = true,
  className = '',
  invert = false,
}) => {
  const person = staffById[id];
  if (!person) return <span>{label || id}</span>;

  const isSelected = selectedId === id;
  const teamColors = getTeamColorClasses(person.team);

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        aria-pressed={isSelected}
        className={`cursor-pointer text-left underline decoration-1 underline-offset-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-sm ${
          invert
            ? 'text-white decoration-white/50 hover:decoration-white'
            : isSelected
              ? `${teamColors.text} font-semibold decoration-current`
              : 'text-slate-900 dark:text-slate-100 decoration-slate-300 dark:decoration-slate-600 hover:text-blue-700 dark:hover:text-blue-300 hover:decoration-current'
        } ${className}`}
      >
        {label || person.name}
      </button>
      {showPlanningTag && person.quyhoach && (
        <span
          className={`text-xs font-medium whitespace-nowrap ${
            invert ? 'text-amber-200' : 'text-amber-700 dark:text-amber-400'
          }`}
        >
          · Quy hoạch
        </span>
      )}
    </span>
  );
};
